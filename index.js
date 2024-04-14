import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import contactUsRoute from './routes/contactUsRoute.js'
import userLoginRoute from './routes/admin/userLoginRoute.js'

const app = express();


dotenv.config();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin:'*',credentials:true}));



app.use('/',userLoginRoute)
app.use('/contactUsForm',contactUsRoute)

// MongoDB connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (err) {
    throw new Error(err);
  }
};


app.listen(process.env.PORT, () => {
    connect()
  console.log("Connected to backend port");
});
