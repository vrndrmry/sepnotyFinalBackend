import express from 'express'
import { createArticle, deleteArticle, fetchMyArticles, updateArticle } from '../controller/articleController.js'
import {upload} from '../multer/multer.js'

const router = express.Router()
router.post('/createArticle',upload.single("imageUrl"),createArticle)
router.get('/getArticles',fetchMyArticles)
router.put('/updateArticle/:articleId',upload.single("imageUrl"),updateArticle)
router.delete('/deleteArticle/:articleId',deleteArticle)
 
export default router 