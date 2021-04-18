const Post= require('../models/post');
const Comment= require('../models/comment');



// For creating a post

module.exports.create_post= (req,res)=>{
    console.log(req.file);
    console.log(req.body);
    res.send("done");
    // Post.uploadedImage(req,res, (err)=>{
    //     if(err) { console.log(err)};
    //     console.log(req.file);
    //     console.log(req.body.content);
    //     res.send("done");
    // })
    // Post.create({
    //     content: req.body.content,
    //     user: req.user._id
    // },(err,post)=>{
    //     if(err) { console.log(err); return;}
    //     req.flash('success','Successfully created post !!!!');
    //     return res.redirect('back');
    // });
};



// For deleting a post

module.exports.delete_post=(req,res)=>{
    Post.findById(req.params.id,(err,result)=>{
        if(err) { console.log(err)}
        if(result.user==req.user.id){
            result.remove();
            Comment.deleteMany({post: req.params.id});
            req.flash('success','Successfully deleted post !!!!');
            res.redirect('back');
        }
        else{
            req.flash('error','Not authorised to delete post !!!!');
            res.redirect('back');
        }
    })
}

// Creating a comment

module.exports.create_comment=(req,res)=>{
    Post.findById(req.body.post,(err,post)=>{
        if(err) { console.log(err); return;}
        if(post){
            Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post
            }, (err,comment)=>{
                if(err) { console.log(err); return;}
                post.comments.push(comment);
                post.save();

                return res.redirect('back');
            })
        }
    })
};



// For deleting a comment

module.exports.delete_comment=(req,res)=>{
    Comment.findById(req.params.id,(err,result)=>{
        if(result.user==req.user.id){
            let post=result.post;
        result.remove();
        Post.findByIdAndUpdate(post,{$pull : { comments: req.params.id}});
        res.redirect('back');
        }
        else{
            res.redirect('back');
        }
    })
}