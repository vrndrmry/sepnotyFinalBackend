import express from 'express'
import { userLoginController } from '../../controller/admin/userLoginController.js'
import { UserModel } from '../../model/admin/userModel.js'
import bcrypt from 'bcrypt'

const router = express.Router()

router.post('/login',userLoginController)

// router.post('/addUser',(req,res)=>{
//     const {username,password,admin} = req.body
//     try{
//         if(!username || !password){
//             return res.status(402).json({message:"Invalid details"})
//         }
//         const user = new UserModel({
//             username,
//             password:bcrypt.hashSync(password,10),
//             admin:admin?admin:false

//         })

//         user.save()

//         res.status(200).json({message:"User added successfully"})
//     }catch(err){
//         res.status(401).json({message:"Error in adding user"})
//     }
// })
export default router