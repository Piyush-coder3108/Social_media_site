const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const post_images_path = path.join('/uploads/post');

const postSchema = new mongoose.Schema({

    content: {
        type: String,
        required: true
    },
    image: {
        type: String
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

var Storage = multer.diskStorage({
    destination: path.join(__dirname, '..', post_images_path),
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


// // static 
postSchema.statics.uploadedImage = multer({ storage: Storage });
postSchema.statics.image_path = post_images_path;


const post = mongoose.model('post', postSchema);

module.exports = post;