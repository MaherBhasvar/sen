const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//@route        GET api/posts/test
//@description  Tests post route
//@access       Public

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

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

    const newPost = new Post({
        text: req.body.text,
        url: req.body.url,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id,
    });

    newPost.save().then(post => res.json(post));
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
                  post.comments.unshift(newComment);
          
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