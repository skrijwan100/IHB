import express from "express";
import upload from "../middleware/upload.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs"
import { verifyLogin } from "../middleware/authMiddleware.js"
import Place from "../models/Place.js"
const placeRouter = express.Router();

placeRouter.post("/addplace", upload.single("profilepic"), async (req, res) => {
    try {

        const { name, tags, description, budget, LocUrl, temperature } = JSON.parse(req.body.placeDetiles)
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
            folder: "user_profiles", // Optional folder in Cloudinary
        });
        fs.unlinkSync(req.file.path);
        const imgUrl = cloudinaryResponse.secure_url;
        const newplace = await Place({
            name: name,
            tags: tags,
            imgUrl: imgUrl,
            description: description,
            LocUrl: LocUrl,
            budget: budget,
            temperature: temperature
        })
        newplace.save()
        return res.status(200).json({ "message": "Place is added", "status": true })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ "status": false, "error": error })

    }

})
placeRouter.get("/allplaceshoe", verifyLogin, async (req, res) => {
    try {
        const allplace = await Place.find()
        res.status(200).json({ "status": true, "data": allplace })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ "status": false, "error": error })
    }

})
export default placeRouter;