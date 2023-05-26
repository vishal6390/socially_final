const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
    commentArray: {
        type: Array,
        default: [
          {
            comment: {
                type: String,
            },
            time: { 
                type: String, 
            },
            senderUsername: {
                type: String,
            },
            senderImage: {
                type: String
            }
          }
        ]
    }
});

module.exports = mongoose.model('Comment',CommentSchema);
