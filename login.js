const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const passport = require('passport');


//Load Input Validation
 const validateRegisterInput = require('../validation/register');
 const validateLoginInput = require('../validation/login');

//Load EmailServerConfig model
const EmailServerConfig = require('../models/EmailServerConfig');




router.post('/admin/login', (req, res) => {

    const {errors, isValid} = validateLoginInput(req.body);

    //check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const username = req.body.username;
    const password = req.body.password;


    // Find the user by username
    EmailServerConfig.findOne({
        where: {
            username: req.body.username,
        }
    })
        .then(user => {
            if(!user) {
                errors.username = "User Not Fonud";
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
                        };

                        //Signed Token
                        jwt.sign(
                            payload, 
                            keys.secretOrKey, 
                            {expiresIn: 3600}, 
                            (err, token)=> {
                                res.json({
                                    
                                    accessTokenExpiredOn: Date.now() + 3600,
                                    accessToken: 'Bearer ' + token,
                                });
                        });

                    } else {
                        errors.password = "Password Incorrect";
                        return res.status(400).json(errors);
                    }
                }).catch(err => {console.log("Error"); res.status(400).json(err)});;
        }).catch(err => {
            res.writeHead(404, {
                'content-encoding': 'gzip',
                'content-type': 'text/html',
                'date': Date.now(), 
                'server': 'nginx/1.10.3 ',
                'transfer-encoding': 'Identity',
                'vary': 'Accept-Encoding',
            })
            res.write(
                '<html><head><title>404 Not Found</title></head><body bgcolor="white"><center><h1>404 Not Found</h1></center><hr><center>nginx/1.10.3</center></body></html>'
                )
            res.end()

            console.log("Error"); 
            //res.status(400).json(err)
        
        });;
});


/* ******************************************************************************************************* */
/* ******************************************************************************************************* */
/* ******************************************************************************************************* */
// Register
/* ******************************************************************************************************* */
/* ******************************************************************************************************* */
/* ******************************************************************************************************* */


router.post('/admin/register', (req, res) => {

    const {errors, isValid} = validateRegisterInput(req.body);

    //check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    //add validation where ever req.body is seen

    User.findOne({email : req.body.email})
        .then(user => {
            if (user) {
                errors.email = "Email already exists";
                return res.status(400).json(errors);
            } else {

                const newUser = new User ({
                    name: req.body.name,
                    email: req.body.email,
                });
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


module.exports = router;