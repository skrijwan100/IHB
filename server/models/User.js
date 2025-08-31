import { Type } from "lucide-react";
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullname: {
        Type: String,
        require: true
    },
    smartID: {
        Type: String,
        require: true,
    },
    passportID: {
        Type: String,
        require: true,
    },
    email: {
        Type: String,
        require: true,
    },
    ownphno: {
        Type: Number,
        require: true
    },
    famphno: {
        Type: Number,
        require: true
    },
    tripst: {
        Type: String,
        require: true,
    },
    trioend: {
        Type: String,
        require: true,
    }
})


const userModel = mongoose.model.user || mongoose.model("user", userSchema);
export default userModel;