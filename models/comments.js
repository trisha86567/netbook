const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },

    //comments:{
       // type:mongoose.Schema.Types.ObjectId,
     //   ref:'Comment'
   // },
      
    //likes:{
      //type:mongoose.Schema.Types.ObjectId,
      //ref:"like"
    
    
   // }




},{
    timestamps:true
})

const Comment = mongoose.model("Comment",commentSchema)
module.exports = Comment; 
/*models> view > route> controller  */