import express from 'express'
import { postContactUsForm } from '../controller/contactUsController.js'

const router = express.Router()

router.post('/contactForm', postContactUsForm)

export default router