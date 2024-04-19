import { UserModel } from "../model/admin/userModel.js";
import BlogModel from "../model/blogModel.js";
import mongoose from "mongoose";


export const createPost = async (req, res) => {
    try { 
        const { title, content, image ,user} = req.body;

        if(!title || !content || !image || !user ){
            return res.status(400).json('Please provide all  fields')
        }

        const exisitUser = await UserModel.findById(user);
    
        if(!exisitUser){
           return res.status(401).json('Invalid User');
        }
         
        const newBlog = new BlogModel({
            title,
            content,
            image,
            user
        })

        const session = await mongoose.startSession();

        session.startTransaction();
        await newBlog.save({session})

        exisitUser.blogs.push(newBlog)

        await exisitUser.save({session })
        await session.commitTransaction()

        await newBlog.save()

        
        return res.status(201).json({success:true,message:"Blog Created",newBlog});
    } catch (error) {
        return res.status(400).json({ message: "Failed to create post",  error:error.message });
    }
}


export const updateBlogController = async(req, res) => {
    try {
        const {id} = req.params;
        const {title, content, image} = req.body;

        const blog = await BlogModel.findByIdAndUpdate(id ,{...req.body},{new:true});

        return res.status(200).json({success:true, message:'Blog Updated',blog});

        
    } catch (error) {
        res.status(400).json({ message: "Error while updating Blog",error:error.message})
    }
}

export const getBlogByIdController =async(req, res) =>{
    try {
        const { id } = req.params;
        const blog = await BlogModel.findById(id);
        if (!blog) {
          return res.status(404).send({
            success: false,
            message: "blog not found with this id",
          });
        }
        return res.status(200).send({
          success: true,
          message: "fetch single blog",
          blog,
        });
      } catch (error) {
        console.log(error);
        return res.status(400).send({
          success: false,
          message: "error while getting single blog",
          error:error.message,
        });
      }
    };

export const deleteBlogController = async(req, res) =>{
     try {
        const blog= await BlogModel.findByIdAndDelete(req.params.id ).populate('user')
        await blog.user.blogs.pull(blog)
        await blog.user.save();
        return res.status(200).json({success:true,message:'Deleted Successfully'})
        
     } catch (error) {
        res.status(400).json({message:"Error while Deleting Blog", error:error.message})
     }
}

export const userBlog = async(req, res)=>{
    try {
        
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3; 

        const startIndex = (page - 1) * limit;

        const userBlog = await UserModel.findById(req.params.id).populate({path:'blogs',options:{limit:limit, skip:startIndex}});
        
        if(!userBlog){
            res.status(404).json('User not Found!')
        }

        res.status(200).json(userBlog)
    } catch (error) {
        res.status(400).json({
            message:"error in user blog",
            error:error.message
        })
    }
}