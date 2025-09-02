import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        require: true
    },
    smartID: {
        type: String,
        require: true,
        unique: true
    },
    passportID: {
        type: String,
        require: true,
    },
    nationality: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
    },
    ownphno: {
        type: String,
        require: true
    },
    famphno: {
        type: String,
        require: true
    },
    tripst: {
        type: String,
        require: true,
    },
    trioend: {
        type: String,
        require: true,
    }
})


const User = mongoose.model("User", userSchema);
export default User;