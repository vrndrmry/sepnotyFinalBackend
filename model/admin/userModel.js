import { mongoose } from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        description:"User email ID",
        required:true
    },
    password:{
        type:String,
        description:"Password of user ",
        required:true
    },
    admin:{
        type:Boolean,
        description:"Admin access",
        default:false
    }
},{timestamps:true})

export const UserModel = mongoose.model("UserModel",UserSchema)