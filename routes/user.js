const express= require('express');
const router= express.Router();
const user_cont= require('../controllers/user_controller');
const passport=require('passport');

router.get('/profile',passport.checkAuthentication,user_cont.profile);

router.post('/register',user_cont.Signup);

router.post('/login',passport.authenticate( 'local',{ failureRedirect: '/'}),user_cont.Signin);

router.get('/logout',user_cont.Signout);

router.use('/post',require('./post'));



module.exports=router;