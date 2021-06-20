const Post=require('../../../models/post');
const Comment=require('../../../models/comment');

module.exports.index=(req,res)=>{
    Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec((err,result)=>{
        if(err) { console.log(err); 
        req.flash('error','Server Error, Please Try again after sometime!!!!');
        res.redirect('/');}
                
       return res.json(200,{
        message: "List of Post",
        posts: result
    })
}) 
}



module.exports.delete_post=(req,res)=>{
    Post.findById(req.params.id,(err,result)=>{
        if(err) { console.log(err);
            req.flash('error','Server Error, Please Try again after sometime!!!!');
            res.redirect('/');

        }
        // if(result.user==req.user.id){
            result.remove();
            Comment.deleteMany({post: req.params.id});
            req.flash('success','Successfully deleted post !!!!');
            res.json(200,{
                "message": "Post successfully deleted"
            })
        // }
        // else{
        //     req.flash('error','Not authorised to delete post !!!!');
        //     res.redirect('back');
        // }
    })
}