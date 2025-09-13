import express from "express"
import User from "../models/User.js";
import { fecthuer } from "../middleware/fecthuser.js";
import {verifyLogin} from "../middleware/authMiddleware.js"
const UserRouter = express.Router();

UserRouter.post("/savedata", (req, res) => {
  const { fullName, passportNumber, trustemail, touristContact, familyContact, startDate, endDate, nationality, Trustid } = req.body;

  const newuser = new User({
    fullname: fullName,
    smartID: Trustid,
    passportID: passportNumber,
    nationality: nationality,
    email: trustemail,
    ownphno: touristContact,
    famphno: familyContact,
    tripst: startDate,
    trioend: endDate
  });

  newuser.save()
    .then(() => {
      res.status(201).json({ status: true, message: "User data saved successfully" });
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({ status: false, error: "Failed to save user data" });
    });
});

UserRouter.get("/fethalldata", fecthuer, async (req, res) => {
  try {
     const userid = req.user;
    const userdata = await User.findById(userid);
    return res.status(200).json({ "Status": true, "message": userdata })

  } catch (error) {
    console.log(error)
    return res.status(505).json({ "Status": false, "error": "Internal server error" })
  }
})
UserRouter.post("/fethdatausename",fecthuer,async(req,res)=>{
  try {
    const {fullName}=req.body
    const userdata = await User.find({ fullname: fullName }).select("-famphno -ownphno -passportID -tripst -trioend -smartID");
    return res.status(200).json({"status":true,"message":userdata})
    
  } catch (error) {
    console.log(error)
    return res.status(505).json({ "Status": false, "message": "Internal server error" ,"error":error})
    
  }
})
export default UserRouter