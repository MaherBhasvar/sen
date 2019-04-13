const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    handle:{
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        //required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isModerator: {
        type: Boolean,
        default: false,
    },
    notification: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users',
            },
            text: {
                type: String,
                required: true,
            },
            headline: {

            },
            url: {

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
        },
    ],
});

module.exports = User = mongoose.model('users', UserSchema);