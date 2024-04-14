import { compareSync } from "bcrypt";
import { UserModel } from "../../model/admin/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const userLoginController = async (req, res) => {
  const { username, password } = req.body;
console.log(req.body)
  try {
    if (!username || !password) {
      return res.status(402).json({ message: "Fill all details" });
    }

    const user = await UserModel.findOne({ username: username });

    if (!user) {
      return res.status(402).json({ message: "User not found" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password,user.password)


    if (!isPasswordCorrect) {
      return res.status(403).json({ message: "Incorrect Password" });
    }

    const payload = {
        username,
        id:user._id
    }

    if(isPasswordCorrect){
        jwt.sign(payload,"secret",(err,token)=>{
            if(err){
                return res.status(400).json(err)
            }else{
                res.cookie("token",token).json({
                    id:user._id,
                    username
                })
            }
        })
    }
  } catch (err) {
    res
      .status(401)
      .json({ message: "there is an error in logging in", error: err });
  }
};
