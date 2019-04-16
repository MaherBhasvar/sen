            Profile.find({
                interests: tag1.tag,
            }).then(profiles => {
                //console.log("profiles that are interested", profiles);
                profiles.map(profile => {
                    //only send notifications to the users once
                    if (!uid.includes(profile._id)) {
                        uid.push(profile._id);
                        console.log(profile._id);
                        //dispatch user update for notifications
                         User.find({handle : profile.handle})
                            .then(user => {
                                console.log(newPost);
                                console.log(user);
                                console.log(typeof user.notification);
                                console.log(newPost.get( "_id" ));

                                //if (profile.handle !== req.user.handle){
                                    // user.notification.push(
                                    //     newPost.get( "_id" )
                                    //     // headline: newPost.headline,
                                    //     // url: newPost.url,
                                    // )}
                                   // user.save().then(doc => console.log("saved notifications")).catch(err => res.status(400).json(err));
                                
                            }
                            )
                            .catch(err => {
                                //res.status(400).json(err)
                                console.log("err from user find", err)
                            });
                    }
                    
                });

            }).catch(err => {
                console.log("err from user find", err)
            });