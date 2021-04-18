module.exports=(req,res)=>{
    // console.log(req.cookies);
    // res.cookie('user_id',105);
    if (req.isAuthenticated()){
        req.flash('success','Logged in Successfully !!!!');
        return res.redirect('/user/profile');
    }

    res.render('home_page',{
        title: 'Advencho | Login or Signup'
    })
   
}