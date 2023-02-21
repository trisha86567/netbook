const Comment = require("../models/comments")
const Post = require("../models/posts")


module.exports.create = async function (req,res) {
  try {
      
        let post = await Post.findById(req.body.post)
      
      if(post){
        let comment = await Comment.create({
            content:req.body.content,
            user:req.user._id,
            post:req.body.post
        });
            post.comments.push(comment);
            post.save()
            res.redirect('/');
        
    }
    
  } catch (error) {
    console.log(error);
    return;
  }
} 

module.exports.destroy = async function (req,res) {
    try {
        let comment= await Comment.findById(req.params.id)
        if(comment.user==req.user.id){
            let postId = comment.post
            comment.remove();
    
          let post=  await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}})
                return res.redirect('/');
                
           
        }else{
            return res.redirect('/');
        };
        
    } catch (error) {
        console.log(error);
        return;
    }

}
