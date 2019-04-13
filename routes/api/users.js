const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');


//Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//Load User model
const User = require('../../models/User');
const Profile = require('../../models/Profile');


//@route        GET api/users/test
//@description  Tests post route
//@access       Public

router.get('/test', (req, res) => res.json({msg: "Users Works"}));

//@route        POST api/users/register
//@description  Tests post route
//@access       Public

router.post('/register', (req, res) => {

    const {errors, isValid} = validateRegisterInput(req.body);

    //check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    //add validation where ever req.body is seen

    User.findOne({email : req.body.email})
        .then(user => {
            //check if handle exists
            Profile.findOne({handle: req.body.handle}).then(profile => {
                if (profile) {
                    errors.handle = 'That handle already exists';
                    return res.status(400).json(errors);
                }
            }).catch(err => {console.log("err"); res.status(400).json(err)});;
            if (user) {
                errors.email = "Email already exists";
                return res.status(400).json(errors);
            } else {
                const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg' , d: 'mm'});

                const newUser = new User ({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    handle: req.body.handle,
                    password: req.body.password,
                    notification: [],
                });

                const newProfile = {
                    handle: req.body.handle,
                    user: {...newUser}, 
                    interests: [],
                    location: '',
                    social: {},
                    
                };
                //new Profile(newProfile).save().then(profile => console.log("profile added successfully")).catch(err => {console.log("err in adding profile"); res.status(400).json(err)});

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        
                        newUser.save()
                            .then(user => res.json(user))
                            .catch( err => console.log(err));
                    });
                });
            }
        }).catch(err => {console.log("Error"); res.status(400).json(err)});
    //check email in the body of the request coming from front end
    //this  is done so that a registered user do not registers himself again
    //body-parser needed to access
} );
//npm install gravatar





//@route        POST api/users/login
//@description  Login User / Return JWT Token
//@access       Public

router.post('/login', (req, res) => {

    const {errors, isValid} = validateLoginInput(req.body);

    //check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;


    // Find the user by email
    User.findOne({email})
        .then(user => {
            if(!user) {
                errors.email = "User Not Fonud";
                return res.status(404).json(errors);
            }

            //check password user.password is the hash password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        //res.json({msg: "Success"});

                        //User Matched Creating Payload
                        const payload = {
                            id: user.id, 
                            name: user.name, 
                            avatar: user.avatar, 
                            handle: user.handle,
                            notification: user.notification,
                            isAdmin: user.isAdmin,
                            isModerator: user.isModerator,
                        };

                        //Signed Token
                        jwt.sign(
                            payload, 
                            keys.secretOrKey, 
                            {expiresIn: 3600}, 
                            (err, token)=> {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token,
                                });
                        });

                    } else {
                        errors.password = "Password Incorrect";
                        return res.status(400).json(errors);
                    }
                }).catch(err => {console.log("Error"); res.status(400).json(err)});;
        }).catch(err => {console.log("Error"); res.status(400).json(err)});;
});



//@route        GET api/users/current
//@description  Return Current User
//@access       Private

// router.get(
//     '/current',
//     passport.authenticate('jwt', {session: false}),
//     (req, res) => {
//         //console.log(res);
//         res.json({id: req.user.id, name: req.user.name, email: req.user.email}); }
//     );

module.exports = router;