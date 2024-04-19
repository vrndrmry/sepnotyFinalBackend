import express from "express";
import { createPost, deleteBlogController,  getBlogByIdController,  updateBlogController, userBlog } from "../controller/blogController.js";

const router = express.Router();


router.post("/createPost", createPost);
router.put("/update-blog/:id" , updateBlogController)
router.get("/get-blog/:id", getBlogByIdController)
router.delete("/delete-blog/:id", deleteBlogController);

//get || user blog

router.get('/user-blog/:id', userBlog)

export default router;