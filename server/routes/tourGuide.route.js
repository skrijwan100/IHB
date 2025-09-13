import { Router } from "express";
import {
    createTourGuide,
    getAllTourGuides,
    getTourGuideById,
    getTourGuideByEmail,
    updateTourGuide,
    ratingTourGuide,
    deleteTourGuide
} from "../controllers/tourGuide.controller.js";
import { verifyLogin } from "../middleware/authMiddleware.js"

const router = Router();

router.route("/createTourGuide").post(createTourGuide);
router.route("/allTourGuides").get(getAllTourGuides);
router.route("/getTourGuideById/:id").get(getTourGuideById);
router.route("/getTourGuideByEmail/:email").get(getTourGuideByEmail);
router.route("/updateTourGuide/:id").put(updateTourGuide);
router.route("/ratingTourGuide/:id").post(ratingTourGuide);
router.route("/deleteTourGuide/:id").delete(deleteTourGuide);

export default router;