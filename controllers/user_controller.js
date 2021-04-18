const User= require('../models/user');
const bcrypt= require('bcryptjs');
const Post= require('../models/post')

module.exports.profile=(req,res)=>{
     Post.find({})
     .populate('user')
     .populate({
         path: 'comments',
         populate: {
             path: 'user'
         }
     })
     .exec((err,result)=>{
         if(err) { console.log(err); return;}
         

        
        return res.render('user_homepage',{
            title: 'Advencho | Profile Page',
            posts: result
        });
        // {
        //     title: 'Advencho | Profile Page',
        //     name: 'Piyush gupta',
        //     posts: result
        // })
     })
 
}


module.exports.Signup=(req,res)=>{
    console.log(req.body);
    const {firstname,lastname,email,password,dob,gender}= req.body;
    User.findOne({email: email})
    .then((user)=>{
        if(user){
            req.flash('error','You are already registered , Please login !!!!');
            res.redirect('/');
        }
        else{
            const newUser= new User({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                Birthday: dob,
                Gender: gender
            });

            newUser.save();
            req.flash('success','You are now registered , Please login !!!!');
            res.redirect('/');
        }

        
    })

   }
   


module.exports.Signin=(req,res)=>{
    if (req.isAuthenticated()){
        req.flash('success','Logged in Successfully !!!!');
        return res.redirect('/user/profile');
    }
    req.flash('error','Failed to Login !!!!');
    return res.redirect('/');
    

}


module.exports.Signout=(req,res)=>{
   
    req.logout();
    req.flash('success','Logged out Successfully !!!!');
    res.redirect('/');
}



