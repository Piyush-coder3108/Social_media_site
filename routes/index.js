const express= require('express');
const router= express.Router();



router.get('/',require('../controllers/home_controller'));

// For user related work
router.use('/user',require('./user'));

// For post related work
router.use('/post',require('./post'))

module.exports=router;
