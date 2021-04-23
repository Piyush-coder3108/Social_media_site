const express= require('express');
const router= express.Router();
const User= require('../models/user');


router.get('/',require('../controllers/home_controller'));

// For user related work
router.use('/user',require('./user'));

// For autocomplete
router.get('/autocomplete',(req,res)=>{
    var regex= new RegExp(req.query["term"],'i');
    User.find({email: regex},{'email': 1}).sort({"updated_at": -1}).sort({"created_at": -1}).limit(20)
    .exec((err,data)=>{
        var result=[];
        if(data && data.length>0){
            data.forEach(user=>{
                let obj={
                    id: user._id,
                    label: user.email
                };
                result.push(obj);
            })
        }
        res.jsonp(result);
    });
})

// For post related work
router.use('/post',require('./post'))

module.exports=router;
