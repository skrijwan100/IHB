import express from "express"
import User from "../models/User.js";
const UserRouter = express.Router();

UserRouter.post("/savedata", (req, res) => {
  const { fullName, passportNumber, trustemail, touristContact, familyContact, startDate, endDate, Trustid } = req.body;

  const newuser = new User({
    fullname: fullName,
    smartID: Trustid,
    passportID: passportNumber,
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


export default UserRouter