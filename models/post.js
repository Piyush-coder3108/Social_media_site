
const mongoose = require('mongoose');
const path = require('path');


const postSchema = new mongoose.Schema({

    content: {
        type: String,
        required: true
    },
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    likes: [
        {
            type: String
        }
    ]
}, {
    timestamps: true
});





const post = mongoose.model('post', postSchema);

module.exports = post;