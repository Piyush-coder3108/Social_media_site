const Post= require('../models/post');
const Comment= require('../models/comment');



// For creating a post

module.exports.create_post= (req,res)=>{
       Post.create({
        content: req.body.content,
        user: req.user._id
    },(err,post)=>{
        if(err) { 
            console.log(err);
            req.flash('error','Server Error, Please Try again after sometime!!!!');
            res.redirect('/');
        }
        req.flash('success','Successfully created post !!!!');
        return res.redirect('back');
    });
};



// For deleting a post

module.exports.delete_post=(req,res)=>{
    Post.findById(req.params.id,(err,result)=>{
        if(err) { console.log(err);
            req.flash('error','Server Error, Please Try again after sometime!!!!');
            res.redirect('/');

        }
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
        if(err) { console.log(err);
            req.flash('error','Server Error, Please Try again after sometime!!!!');
            res.redirect('/');

        }
        if(post){
            Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post
            }, (err,comment)=>{
                if(err) { console.log(err);
                    req.flash('error','Server Error, Please Try again after sometime!!!!');
                    res.redirect('/');
        
                }
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
};



// For liking a post
module.exports.like_post=(req,res)=>{
    Post.findById(req.body.postid,(err,result)=>{
        if(err) { console.log(err);
            req.flash('error','Server Error, Please Try again after sometime!!!!');
            res.redirect('/');
        }
      for(var i=0;i<result.likes.length;i++){
          if(result.likes[i]==req.user.id){
            Post.findByIdAndUpdate(req.body.postid,{$pull : { likes: req.user.id}},(err,done)=>{
                
            });
            result.save();
              return res.redirect('back');
          }
      }
      result.likes.push(`${req.user.id}`);
      result.save();
      return res.redirect('back');
        
    })
}