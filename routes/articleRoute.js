import express from 'express'
import { createArticle, deleteArticle, fetchMyArticles, updateArticle } from '../controller/articleController.js'


const router = express.Router()
router.post('/createArticle',createArticle)
router.get('/getArticles',fetchMyArticles)
router.put('/updateArticle/:articleId',updateArticle)
router.delete('/deleteArticle/:articleId',deleteArticle)

export default router