import express from 'express'
import { responsesRecievedController } from '../../controller/admin/adminResponseController.js'

const router = express.Router()

router.get("/:userId/response", responsesRecievedController);

export default router