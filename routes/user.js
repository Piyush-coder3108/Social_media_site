const express= require('express');
const router= express.Router();
const user_cont= require('../controllers/user_controller');
const passport=require('passport');

router.get('/profile',passport.checkAuthentication,user_cont.profile);

router.post('/register',user_cont.Signup);

router.post('/login',passport.authenticate( 'local',{ failureRedirect: '/'}),user_cont.Signin);

router.get('/logout',user_cont.Signout);

router.post('/find_profile',passport.checkAuthentication,user_cont.find_profile);

router.get('/forgot_password',(req,res)=>{ res.render('forgot_password',{ title: 'Advencho | Forgot Password'})});

router.post('/forgot_password',user_cont.forgot_password)

router.post('/update_profile',passport.checkAuthentication,user_cont.update_profile);

router.post('/send_request',passport.checkAuthentication,user_cont.manage_request);

router.get('/friend/accept_request/:id',passport.checkAuthentication,user_cont.accept_request);

router.get('/friend/decline_request/:id',passport.checkAuthentication,user_cont.decline_request);

router.use('/post',require('./post'));






module.exports=router;