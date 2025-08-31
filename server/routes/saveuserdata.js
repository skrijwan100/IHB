import express from "express"
const UserRouter = express.Router();

UserRouter.post("/savedata",(req,res)=>{
  return res.json({"message":"Hello"})
})

export default UserRouter