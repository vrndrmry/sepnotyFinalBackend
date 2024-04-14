import express from 'express'
import { getContactUsForm, postContactUsForm } from '../controller/contactUsController.js'

const router = express.Router()

router.post('/contactForm', postContactUsForm)
router.get('/getContactUsDetails', getContactUsForm)

export default router