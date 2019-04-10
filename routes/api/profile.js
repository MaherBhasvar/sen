const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


//Load Validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require ('../../validation/experience');
const validateeducationInput = require ('../../validation/education');

//Load Profile Model
const Profile = require('../../models/Profile');
//Load User Profile
const User = require('../../models/User');


//@route        GET api/profile/test
//@description  Tests post route
//@access       Public

router.get('/test', (req, res) => res.json({msg: "Profile Works"}));


//@route        GET api/profile
//@description  get current user's profile
//@access       Private

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = {};

    Profile.findOne({user: req.user.id})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = " There is no profile for this user";
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => console.log(err));
});


//@route        GET api/profile/handle/:handle
//@description  Get profile by handle , Remember this is a backend route, front end route can be different
//@access       Public

router.get('/handle/:handle', (req, res)=> {
    const errors = {};

    Profile.findOne({handle: req.params.handle})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json({profile: 'There is no such profile'}));
});

//@route        GET api/profile/user/:user_id
//@description  Get profile by user id , Remember this is a backend route, front end route can be different
//@access       Public

router.get('/user/:user_id', (req, res)=> {
    const errors = {};

    Profile.findOne({user: req.params.user_id})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json({profile: 'There is no such profile'}));
})

//@route        GET api/profile/all
//@description  Get all profiles
//@access       Public
router.get('/all', (req,res) => {
    const errors = {};

    Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile) {
            errors.noprofile = 'There are no profiles ';
            res.status(404).json(errors);
        }
        res.json(profile);
    })
    .catch(err => res.status(404).json({profile: 'There are no profiles'}));
})









//@route        POST api/profile
//@description  get current user's profile
//@access       Private

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    const {errors, isValid} = validateProfileInput(req.body);

    //check validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    //Get fields
    const profileFields = {};
    profileFields.user = req.user.id;

    if(req.body.handle) profileFields.handle = req.body.handle;
    // if(req.body.company) profileFields.company = req.body.company;
    // if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    // if(req.body.status) profileFields.status = req.body.status;
    // if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;

    //interests split into array
    if (typeof req.body.interests !== 'undefined') {
        profileFields.interests = req.body.interests.split(',');
    }

    //Social 
    profileFields.social = {}; //inittialize social
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;


    Profile.findOne({user: req.user.id})
        .then(profile => {

            if (profile) {
                Profile.findOne({handle: req.body.handle}).then(profile => {
                    console.log("profile");
                    console.log(profile);
                    if(profile.user=== req.user.id) {
                        errors.handle = 'That handle already exists';
                        return res.status(400).json(errors);
                    } 
                })
                //update
                User.findOneAndUpdate ({user: req.user.id}).then(user => {console.log("user updated")}).catch(err => {console.log("Error"); res.status(400).json(err)});;
                Profile.findOneAndUpdate ({user: req.user.id}, {$set: profileFields}, {new: true})
                    .then(profile => res.json(profile)).catch(err => {console.log("Error"); res.status(400).json(err)});;
                
            } else {
                //create
                //check if handle exists
                Profile.findOne({handle: profileFields.handle}).then(profile => {
                    if (profile) {
                        errors.handle = 'That handle already exists';
                        return res.status(400).json(errors);
                    }

                    //save profile
                    new Profile(profileFields).save().then(profile => res.json(profile));
                });
            }
        }).catch(err => {console.log("Error"); res.status(400).json(err)});;
});


//@route        POST api/profile/experience
//@description  post current user's experience
//@access       Private

// router.post('/experience', passport.authenticate('jwt', {session: false}), (req, res) => {

//     const {errors, isValid} = validateExperienceInput(req.body);

//     //check validation
//     if(!isValid) {
//         return res.status(400).json(errors);
//     }

//     Profile.findOne({user: req.user.id}) 
//         .then(profile => {
//             const newExp = {
//                 title: req.body.title,
//                 company: req.body.company,
//                 location: req.body.location,
//                 from: req.body.from,
//                 to: req.body.to,
//                 current: req.body.current,
//                 description: req.body.description,

//             }

//             //Add to experience array
//             profile.experience.unshift(newExp);

//             profile.save().then(profile => res.json(profile));
//         })
// })

//@route        POST api/profile/education
//@description  post current user's education
//@access       Private

// router.post('/education', passport.authenticate('jwt', {session: false}), (req, res) => {

//     const {errors, isValid} = validateeducationInput(req.body);

//     //check validation
//     if(!isValid) {
//         return res.status(400).json(errors);
//     }

//     Profile.findOne({user: req.user.id}) 
//         .then(profile => {
//             const newEdu = {
//                 school: req.body.school,
//                 degree: req.body.degree,
//                 fieldofstudy: req.body.fieldofstudy,
//                 from: req.body.from,
//                 to: req.body.to,
//                 current: req.body.current,
//                 description: req.body.description,

//             }

//             //Add to education array
//             profile.education.unshift(newEdu);

//             profile.save().then(profile => res.json(profile));
//         })
// });

//@route        DELETE api/profile/experience/:exp_id
//@description  Delete current user's experience
//@access       Private

// router.delete('/experience/:exp_id', passport.authenticate('jwt', {session: false}), (req, res) => {


//     Profile.findOne({user: req.user.id}) 
//         .then(profile => {
//             const removeIndex = profile.experience
//                 .map(item => item.id)
//                 .indexOf(req.params.exp_id);

//                 //Splice out of array
//                 profile.experience.splice(removeIndex, 1);

//                 //save
//                 profile.save().then(profile => res.json(profile));
//         })
//         .catch (err => res.status(404).json);

// });

//@route        DELETE api/profile/education/:edu_id
//@description  Delete current user's education
//@access       Private

// router.delete('/education/:edu_id', passport.authenticate('jwt', {session: false}), (req, res) => {


//     Profile.findOne({user: req.user.id}) 
//         .then(profile => {
//             const removeIndex = profile.education
//                 .map(item => item.id)
//                 .indexOf(req.params.edu_id);

//                 //Splice out of array
//                 profile.education.splice(removeIndex, 1);

//                 //save
//                 profile.save().then(profile => res.json(profile));
//         })
//         .catch (err => res.status(404).json);

// });



//@route        DELETE api/profile
//@description  Delete current user's profile and account
//@access       Private

router.delete('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    Profile.findOneAndRemove({ user: req.user.id })
        .then(() => {
            User.findOneAndRemove({ _id: req.user.id})
                .then (() => res.json({success: true}));
        }).catch(err => {console.log("Error"); res.status(400).json(err)});


});




module.exports = router;