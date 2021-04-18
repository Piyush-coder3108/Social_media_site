const express= require('express');
const passport = require('passport');
const Router= express.Router();
const Post_controller= require('../controllers/post_controller');
var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../uploads/post_images/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
var upload = multer({ storage: storage})


// Route for creating post
Router.post('/create_post',passport.checkAuthentication,upload.none(),Post_controller.create_post);

// Router for creating comment
Router.post('/create_comment',passport.checkAuthentication,Post_controller.create_comment);

// Router for deleting a post
Router.get('/delete/:id',passport.checkAuthentication,Post_controller.delete_post);

// Router for deleting a comment
Router.get('/comment/delete/:id',passport.checkAuthentication,Post_controller.delete_comment);

module.exports=Router;