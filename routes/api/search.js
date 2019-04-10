const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//@route        GET api/search/test
//@description  Tests post route
//@access       Public

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');



const validateSearchInput = require('../../validation/search');

router.get('/test', (req, res) => res.json({msg: "Posts Works"}));




//@route        GET api/posts
//@description  Search all Posts
//@access       Public
router.get ('/', (req, res) => {
    return res.json({search: "Empty Search"});

})


//@route        GET api/search
//@description  Search according to search term
//@access       Public
router.get ('/:id', (req, res) => {
    const {errors, isValid} = validateSearchInput(req.params.id);

    //check validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    return res.json({searchTerm : req.params.id});


});


//@route        POST api/search
//@description  Search according to search term
//@access       Public
router.post ('/', (req, res) => {
    const {errors, isValid} = validateSearchInput(req.body);

    //check validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const newObject = {
        search: req.body.search,
    }

    //return res.json(newObject);
    Post.find()
    .sort({date: -1})
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({nopostsfound: 'No posts found'}));

});

module.exports = router;