const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const PostSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true, 
    },
    text: {
        type: String,
        required: true, 
    },
    name: {
        type: String,
    },
    avatar: {
        type: String
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    dislikes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    reports: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    tags: [[]],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users',
            },
            text: {
                type: String,
                required: true,

            },
            name: {
                type: String,
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now,
            },
            reports: [
                {
                    user: {
                        type: Schema.Types.ObjectId,
                        ref: 'users'
                    }
                }
            ],
            reply: [
                {
                    user: {
                        type: Schema.Types.ObjectId,
                        ref: 'users',
                    },
                    text: {
                        type: String,
                        required: true,
        
                    },
                    name: {
                        type: String,
                    },
                    avatar: {
                        type: String
                    },
                    date: {
                        type: Date,
                        default: Date.now,
                    },
                    reports: [
                        {
                            user: {
                                type: Schema.Types.ObjectId,
                                ref: 'users'
                            }
                        }
                    ],
                }],
        }
    ],
    date: {
        type: Date,
        default: Date.now,
    },
})

module.exports = Post = mongoose.model('post',PostSchema);