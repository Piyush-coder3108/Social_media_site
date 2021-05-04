const express= require('express');
const passport = require('passport');
const Router= express.Router();
const Post_controller= require('../controllers/post_controller');




// Route for creating post
Router.post('/create_post',passport.checkAuthentication,Post_controller.create_post);

// Router for creating comment
Router.post('/create_comment',passport.checkAuthentication,Post_controller.create_comment);

// Router for deleting a post
Router.get('/delete/:id',passport.checkAuthentication,Post_controller.delete_post);

// Router for deleting a comment
Router.get('/comment/delete/:id',passport.checkAuthentication,Post_controller.delete_comment);

// Router for liking the post
Router.post('/like',passport.checkAuthentication,Post_controller.like_post);

module.exports=Router;