const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//@route        GET api/search/test
//@description  Tests post route
//@access       Public

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const Tag = require('../../models/Tag');



const validateSearchInput = require('../../validation/search');

router.get('/test', (req, res) => res.json({msg: "Posts Works"}));




//@route        GET api/posts
//@description  Search all Posts
//@access       Public
router.get ('/', (req, res) => {
    return res.status(400).json({search: "Empty Search"});

})


//@route        GET api/search/:search
//@description  Search according to search term
//@access       Public
router.get ('/:search', (req, res) => {
    const {errors, isValid} = validateSearchInput({search: req.params.search.toString()});
    if (req.params.search === undefined) {
      console.log("empty search returned")
      return res.status(400).json({search: "Empty Search"});
    }
    //check validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    // console.log("get search ");
    // console.log(req.params);
    // console.log(req.params.search);
    text = req.params.search
    .replace(/\s+/g, " ")
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .toLowerCase()
    .split(" ");

    posts = [];
    text.forEach(word => {
        Tag.find({tag: word}, function (err, data1) {
        if (err) return console.error(err);
        data1.forEach(element => {
          Post.find({_id: element.postid}, function(err, data2){
            if (err) return console.error(err);
            data2.forEach(result => {
              // console.log(result.link);
              posts.push(result);

            });
          });
        });

      });
      });

      //not working in sync if I remove setTimeOut because it is returning
      // response before above code executes try to do it without timeout if possible
      setTimeout(function () {
        //console.log(posts);
        var set = new Set();
        var result = [];
        posts.forEach(element => {
          if(!set.has(String(element._id)))
          {
            set.add(String(element._id));
            result.push(element);
          }
        });
        result.sort(function(first, second) {
          return second.dateTime - first.dateTime;
        });

        // console.log(set);
        //console.log(result.length);
        if(result.length == 0)
            res.status(404).json({nopostsfound: 'No posts found'})
        else
            res.send(result);
      }, 1000);
});


//@route        POST api/search
//@description  Search according to search term
//@access       Public
router.post ('/', (req, res) => {
    const {errors, isValid} = validateSearchInput(req.body);
    // console.log(res.body);
    //check validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const newObject = {
        search: req.body.search,
    }

    //return res.json(newObject);
    // Post.find()
    // .sort({date: -1})
    // .then(posts => res.json(posts))
    // .catch(err => res.status(404).json({nopostsfound: 'No posts found'}));
    // console.log(" post search")
    // console.log(req.body.search);
    text = req.body.search
    .replace(/\s+/g, " ")
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .toLowerCase()
    .split(" ");

    posts = [];
    text.forEach(word => {
        Tag.find({tag: word}, function (err, data1) {
        if (err) return console.error(err);
        data1.forEach(element => {
          Post.find({_id: element.postid}, function(err, data2){
            if (err) return console.error(err);
            data2.forEach(result => {
              //error here result.link returning undefined 
              // console.log(result.link);
              posts.push(result);

            });
          });
        });

      });
      });

      //not working in sync if I remove setTimeOut because it is returning
      // response before above code executes try to do it without timeout if possible
      setTimeout(function () {
        //console.log(posts);
        var set = new Set();
        var result = [];
        posts.forEach(element => {
          if(!set.has(String(element._id)))
          {
            set.add(String(element._id));
            result.push(element);
          }
        });
        result.sort(function(first, second) {
          return second.dateTime - first.dateTime;
        });

        // console.log(set);
        // console.log(result.length);
        if(result.length == 0)
            res.status(404).json({nopostsfound: 'No posts found'})
        else
            res.send(result);
      }, 1000);

});

module.exports = router;