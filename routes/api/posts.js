const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require("path");

//@route        GET api/posts/test
//@description  Tests post route
//@access       Public

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

var { Tag } = require('../../models/Tag');
//const Tag = require('../../models/Tag');

//const Tag = mongoose.model('Tag');

const helper = require('../controllers/helper.js');
// const getPost = require('./controllers/getPost.js').getPost;
var computeTF = helper.computeTF;
var computeTFIDF = helper.computeTFIDF;

const validatePostInput = require('../../validation/post');
const validateCommentInput = require('../../validation/comment');

router.get('/test', (req, res) => res.json({msg: "Posts Works"}));




//@route        GET api/posts
//@description  See Posts
//@access       Public
router.get ('/', (req, res) => {
    Post.find()
    .sort({date: -1})
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({nopostsfound: 'No posts found'}));
})


//@route        GET api/posts/:id
//@description  find by ID
//@access       Public
router.get ('/:id', (req, res) => {
    Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({nopostfound: 'No post found of this id'}));
});









//@route        POST api/posts
//@description  Create Posts
//@access       Private
router.post('/', passport.authenticate('jwt', {session: false,}), (req, res) => {

    const {errors, isValid} = validatePostInput(req.body);

    if(!isValid) {
        //if any errors, send 400 with the error
        return res.status(400).json(errors);
    }

    const url = req.body.url;
    request(url, (error, resp, body) => {
        if (error) {
           console.log(error);
        }
    
        let $ =  cheerio.load(body);
        let rawdata = fs.readFileSync(path.resolve(__dirname, "../IDF_score.json"));
        let dict = JSON.parse(rawdata);
        var tf = computeTF(req.body.text + req.body.text + $.text());
        // arrays of arrays format
        tfidf_score = computeTFIDF(tf, dict);     // tfidf score in [tag, score] format
        console.log(tfidf_score.slice(0, 10));
        console.log('Tags above');
        const newPost = new Post({
            text: req.body.text,
            url: req.body.url,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id,
            handle: req.user.handle,
            tags :  tfidf_score.slice(0, 10)
        });
    
        // Separate storage for tags with scores
        var pid = newPost.get( "_id" );
        tfidf_score.slice(0, 10).forEach(element => {
          Tag.create(
            { tag: element[0],
              postid: pid,
              score: element[1] },
            (errorInCreation) => {
             if (errorInCreation) {
               console.log(errorInCreation);
             } else {
               console.log('Tag Added');
             }
            }
           );
           //newPost.save().then(post => res.json(post));
        // const newTag = { tag: element[0],
        //     postid: pid,
        //     score: element[1] }
        //  
        });

        //newPost.save().then(post => res.json(post));
        newPost.save().then((doc) => {
            res.send(doc);
          }, (e) => {
            res.status(400).send(e);
        });


        
    }); 

});



//@route        Delete api/posts/:id
//@description  Delete Posts
//@access       Private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    //check for the owner
                    if(post.user.toString() !== req.user.id) {
                        return res.status(401).json({notauthorised: 'User not authorised'});
                    }

                    //Delete
                    post.remove().then(() => res.json({success: true}));
                })
                .catch(err => res.status(404).json({postnotfound: 'No post found'}));
        }).catch(err => {console.log("Error"); res.status(400).json(err)});
});


//@route        POST api/posts/like/:id
//@description  Like Post
//@access       Private
router.post(
    '/like/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        //check for the owner
        if(req.user === null) {
            return res.status(401).json({notauthorised: 'User not authorised'});
        }
      Profile.findOne({ user: req.user.id }).then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            

            if (
              post.likes.filter(like => like.user.toString() === req.user.id)
                .length > 0
            ) {
              return res
                .status(400)
                .json({ alreadyliked: 'User already liked this post' });
            }
  
            // Add user id to likes array
            post.likes.unshift({ user: req.user.id });
  
            post.save().then(post => res.json(post));
          })
          .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
      }).catch(err => {console.log("Error"); res.status(400).json(err)});;
    }
  );

//@route        POST api/posts/unlike/:id
//@description  unLike Post
//@access       Private
router.post('/unlike/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    //check for the owner
    if(req.user === null) {
        return res.status(401).json({notauthorised: 'User not authorised'});
    }
    Profile.findOne({user: req.user.id})
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {

                    if(post.likes.filter(like => like.user.toString()=== req.user.id ).length === 0 ) {
                        return res.status(400).json({noliked: 'you have not liked this post'});
                    }

                    //remove user id to likes array
                    const removeIndex = post.likes
                        .map(item => item.user.toString())
                        .indexOf(req.user.id);
                    
                    //Splice out of array
                    post.likes.splice(removeIndex, 1);

                    //Save
                    post.save().then(post => res.json(post));
                    console.log(post);
                })
                .catch(err => res.status(404).json({postnotfound: 'No post found'}));
        }).catch(err => {console.log("Error"); res.status(400).json(err)});
});

//@route        POST api/posts/comment/:id
//@description  Comment Post
//@access       Private
//router.post('/comment/:id', 
    // passport.authenticate('jwt', {session: false,},
    // (err, user, info) => {
    //     if(err || !user) {
    //         const err = {error: "Login to continue"};
    //         err.status = 400;
    //         err.code = 'CP_SI_ValidationFailed';

    //         return res.json(err); // send the error response to client
    //     } 
    //     return next(); // continue to next middleware if no error.
    // }
    // ), 
    // (req, res, next) => {
    //     //handle success
    //     const {errors, isValid} = validatePostInput(req.body);

    //     if(!isValid) {
    //         //if any errors, send 400 with the error
    //         return res.status(400).json(errors);
    //     }

    //     Post.findById(req.params.id)
    //         .then(post => {
    //             const newComment = {
    //                 text: req.body.text,
    //                 name: req.body.name,
    //                 avatar: req.body.avatar,
    //                 user: req.user.id,
    //             }

    //             //Add to comments array
    //             post.comments.unshift(newComment);

    //             //save
    //             post.save().then(post => res.json(post));

    //         })
    //         .catch(err =>res.status(404).json({postnotfound: 'No post found'}));

    // },
    // (err, req, res, next) => {
    //     //handle failure
    //      { return res.status(401).json(err); }
    // }
    // );

    router.post(
        '/comment/:id',
        passport.authenticate('jwt', { session: false }),
        (req, res) => {
            //check for the owner
            if(req.user === null) {
                return res.status(401).json({notauthorised: 'User not authorised'});
            }
          const { errors, isValid } = validateCommentInput(req.body);
      
          // Check Validation
          if (!isValid) {
            // If any errors, send 400 with errors object
            return res.status(400).json(errors);
          }

          Profile.findOne({user: req.user.id})
            .then(profile => {
                Post.findById(req.params.id)
                .then(post => {
                  const newComment = {
                    text: req.body.text,
                    name: req.body.name,
                    avatar: req.body.avatar,
                    user: req.user.id
                  };
          

                  // Add to comments array
                  post.comments.push(newComment);
          
                  // Save
                  post.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
            })
            .catch(err => res.status(401).json({notauthorised: 'User not authorised'}))
      

        }
      );

//@route        DELETE api/posts/comment/:id/:comment_id
//@description  delte a Comment 
//@access       Private
router.delete ('/comment/:id/:comment_id', passport.authenticate('jwt', {session:false}), (req, res)=> {
    Post.findById(req.params.id)
        .then(post => {
            //check to see if comment exists
            if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
                return res.status(404).json({commentnotexists: 'Comment Does not exists'});
            }

            //Get remove index
            const removeIndex = post.comments
                .map(item => item._id.toString(req.param.id))
                .indexOf(req.params.comment_id);

            //Splice Comment out of array
            post.comments.splice(removeIndex,1);

            //Save
            post.save().then(post => res.json(post));
        })
        .catch(err =>res.status(404).json({postnotfound: 'No post found'}));
});
module.exports = router;