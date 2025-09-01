import express from "express"
import User from "../models/User.js";
const UserRouter = express.Router();

UserRouter.post("/savedata", (req, res) => {
  const { fullName, passportNumber, trustemail, touristContact, familyContact, startDate, endDate, nationality,Trustid } = req.body;

  const newuser = new User({
    fullname: fullName,
    smartID: Trustid,
    passportID: passportNumber,
    nationality:nationality,
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

UserRouter.get("/fethalldata",(req,res)=>{
  
})

export default UserRouter