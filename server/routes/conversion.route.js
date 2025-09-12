import { Router } from "express";
import {
    createConversion,
    getAllConversions,
    getConversionById,
    updateConversion,
    deleteConversion
} from "../controllers/conversion.controller.js"
import { verifyLogin } from "../middleware/authMiddleware.js"

const router = Router();

router.route("/createConversion").post(verifyLogin, createConversion);
router.route("/allConversions").get(verifyLogin, getAllConversions);
router.route("/getConversionById/:id").get(verifyLogin, getConversionById);
router.route("/updateConversion/:id").put(verifyLogin, updateConversion);
router.route("/deleteConversion/:id").delete(verifyLogin, deleteConversion);

export default router;