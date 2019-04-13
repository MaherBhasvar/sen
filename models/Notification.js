var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ObjectId = mongoose.Schema.Types.ObjectId;

//storing tag, postid so ten entry with same postid and diff tag 
const NotificationSchema = new Schema ({
    notificationid: {
        type: Schema.Types.ObjectId,
        ref: 'notifications',
    },
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    postid: {
        type: Schema.Types.ObjectId,
        ref: 'posts',
    },
    date: {
        type: Date,
        default: Date.now,
    },
   
});
// var Tag = mongoose.model("Tag");
// module.exports = { Tag };
module.exports = Tag = mongoose.model('Notification',NotificationSchema);