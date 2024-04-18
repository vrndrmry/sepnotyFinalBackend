import express from "express";
import fs from 'fs';
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import contactUsRoute from './routes/contactUsRoute.js'
import userLoginRoute from './routes/admin/userLoginRoute.js'
import adminResponseRouter from './routes/admin/adminResponseRoute.js'
import cookieParser from "cookie-parser";
import https from 'https'

const app = express();


dotenv.config();

// Middleware
// app.use(cors({ credentials: true, origin: true }));
server.use(cors({ credentials: true, origin: "*" }));
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({extended:true}))
server.use(bodyParser.urlencoded({ extended: true }));

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});


server.use('/',userLoginRoute)
server.use('/contactUsForm',contactUsRoute)
server.use(`/:userId/dashboard`,adminResponseRouter)

// MongoDB connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (err) {
    throw new Error(err);
  }
};

// HTTPS Options
const httpsOptions = {
  // key: fs.readFileSync('/etc/letsencrypt/live/backend.sepnoty.com/privkey.pem'),
  // cert: fs.readFileSync('/etc/letsencrypt/live/backend.sepnoty.com/fullchain.pem')
};

// Create HTTPS Server
const server = https.createServer(httpsOptions, app);


// app.listen(process.env.PORT, async () => {
//    await connect()
//   console.log("Connected to backend port");
// });


// Listening to the port
server.listen(process.env.PORT, () => {
  connect();
  console.log("Connected to backend port");
});