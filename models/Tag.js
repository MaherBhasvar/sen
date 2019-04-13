// var mongoose = require('mongoose');
// //var ObjectId = mongoose.Schema.Types.ObjectId;

// //storing tag, postid so ten entry with same postid and diff tag 

// const Schema = mongoose.Schema;

// const TagSchema = new Schema ({
//     tag: {
//         type: String,
//         required: true
//     }, 
//     postid: {
//         type: String,
//         required: true
//     },
//     score: {
//         type: Number,
        
//     },
// });

// module.exports = Tag = mongoose.model('tag', TagSchema);


var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ObjectId = mongoose.Schema.Types.ObjectId;

//storing tag, postid so ten entry with same postid and diff tag 
const TagSchema = new Schema ({
    tag: {
        type: String,
        required: true
    }, 
    postid: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        
    }
   
});
// var Tag = mongoose.model("Tag");
// module.exports = { Tag };
module.exports = Tag = mongoose.model('Tag',TagSchema);