import mongoose from  "mongoose";



const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true 
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"UserModel",
        required: true
    }
 

},{timestamps:true});


const BlogModel = mongoose.model( "BlogModel",blogSchema);

export default BlogModel;