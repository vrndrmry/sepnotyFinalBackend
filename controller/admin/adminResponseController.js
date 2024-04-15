import cookieParser from "cookie-parser";
import { UserModel } from "../../model/admin/userModel.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import contactUsModel from "../../model/contactUsModel.js";

export const responsesRecievedController = (req, res) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, "secret", async (err, info) => {
      if (err) {
        throw err;
      }
      const { userId } = req.params;
      const userVerification = await UserModel.findOne({_id:userId});
      
      if(!userVerification){
          return res.status(401).json({message:"Unauthorised Access"})
      }
      if(userVerification){
          const recievedData = await contactUsModel
            .find()
            .sort({ createdAt: -1 });
          return res.status(200).send(recievedData);
      }
    });
  }
};
