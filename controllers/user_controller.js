const User= require('../models/user');
const bcrypt= require('bcryptjs');
const Post= require('../models/post');
const httpmsg= require('http-msgs');

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
         
        User.findById(req.user.id)
        .populate('Pending_request')
        .populate('Friends')
        .exec((error,user)=>{

            if(err) { console.log(err) }
            res.locals.page='home';
            return res.render('user_homepage',{
                title: `Advencho | ${req.user.firstname} ${req.user.lastname}`,
                posts: result,
                request: user,
        })

        })
       
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
    .catch(err=>{
        req.flash('error','Server Error !!!!');
        res.redirect('/');
    });

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


module.exports.find_profile=(req,res)=>{
    var ispresent=false;
    User.find({email: req.body.username},(err,user)=>{
        if(err) { console.log(err)}
        if(!user){
            req.flash('error','User not found');
            res.redirect('back');
        }
        else{
            for(var i=0;i<user[0].Pending_request.length;i++){
                if(user[0].Pending_request[i]==req.user.id){
                    ispresent=true;
                }
            }
            Post.find({})
     .populate('user')
     .populate({
         path: 'comments',
         populate: {
             path: 'user'
         }
     })
     .exec((err,result)=>{
         User.findById(req.user.id)
         .populate('Pending_request')
         .exec((error,response)=>{
          if(error || err ){ console.log(error || err)}
          var friend=false;
          
          for(var xyz=0;xyz<response.Friends.length;xyz++){
                if(response.Friends[xyz].toString()==user[0].id){
                    friend=true;
                }
          }
          
          res.render('profile_page',{
            title: `${user[0].firstname} ${user[0].lastname} | Advencho`,
            posts: result,
            person: user[0],
            present: ispresent,
            request: response,
            isfriend: friend

         })
         
         
            
            });
        });
        }
    
    })
    
};


// For updating profile
module.exports.update_profile=(req,res)=>{
    User.findById(req.user.id,(err,result)=>{
        if(err) { console.log(err)}
         const { firstname, lastname, dob, gender, bio, work, study, live, status}= req.body;
         result.firstname=firstname;
         result.lastname=lastname;
         result.Birthday=dob;
         result.Gender=gender;
         result.Bio=bio;
         result.Work=work;
         result.Studies=study;
         result.Lives=live;
         result.Status=status;
         result.save();
         res.redirect('back');

    })
}



// For managing request
module.exports.manage_request=(req,res)=>{
    console.log(req.body);
    User.findById(req.body.to,(err,result)=>{
        if(err) { console.log(err)}
        result.Pending_request.push(req.body.from);
        result.save();
    })
    httpmsg.sendJSON(req,res,{
        done: 'true'
    })

}


// for accepting a request
module.exports.accept_request=(req,res)=>{
    User.findById(req.user.id,(err,result)=>{
        if(err) { console.log(err)}
        result.Friends.push(req.params.id);
        User.findByIdAndUpdate(req.user.id,{$pull : { Pending_request: req.params.id}},(err,done)=>{       
        });
        result.save();
        User.findById(req.params.id,(err,user)=>{
            if(err) { console.log(err)}
            user.Friends.push(req.user.id);
            user.save();
            res.redirect('back');
        })
    })
}

// for decline a request
module.exports.decline_request=(req,res)=>{
    User.findByIdAndUpdate(req.user.id,{$pull : { Pending_request: req.params.id}},(err,done)=>{       
    });
    res.redirect('back');
};


// For changing password

module.exports.forgot_password=(req,res)=>{
    User.findOneAndUpdate({email: req.body.email},{$set:{'password': req.body.password}},(err,result)=>{
        if(err) { console.log(err)}
        if(!result){
            req.flash('error','No User found !!!!!');
            res.redirect('/');
        }
        else{
            // result.save();
            req.flash('success','Password changed successfully!!!!');
            res.redirect('/')
        }
    })
    
}

