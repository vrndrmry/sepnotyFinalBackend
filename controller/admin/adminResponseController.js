import cookieParser from "cookie-parser";
import { UserModel } from "../../model/admin/userModel.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import contactUsModel from "../../model/contactUsModel.js";

export const responsesRecievedController = (req, res) => {
  try {
    const token = req.cookies.token;
    if (token) {
      jwt.verify(token, "secret", async (err, info) => {
        if (err) {
          return res.status(401).json({ message: "Unauthorised Access" });
        }
        const { userId } = req.params;
        if (!userId) {
          return res.status(401).json({ message: "Unauthorised Access" });
        }
        const userVerification = await UserModel.findOne({ _id: userId });

        if (!userVerification) {
          return res.status(401).json({ message: "Unauthorised Access" });
        }
        const page = parseInt(req.query.page) || 1;
        const pageSize = 6;
        const skip = (page - 1) * pageSize;
        const limit = 6;

        const totalDocuments = await contactUsModel.countDocuments();
        if (userVerification) {
          const recievedData = await contactUsModel
            .find()
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip);

          return res.status(200).json({
            recievedData,
            itemsPerPage: pageSize,
            total: Math.ceil(totalDocuments / pageSize),
          });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
