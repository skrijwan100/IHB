import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import Conversion from "../models/Conversion.js";
import User from "../models/User.js";

const createConversion = asyncHandler(async (req, res) => {
    const { content } = req.body;
    if(!content) {
        throw new ApiError(400, "Content is required");
    }
    const user = await User.findById(req.user._id);
    if(!user) {
        throw new ApiError(404, "User not found");
    }
    const conversion = await Conversion.create({
        user: user._id,
        content
    })  
    if(!conversion) {
        throw new ApiError(500, "Failed to create conversion");
    }
    res.status(201).json(new ApiResponse(201, {conversion}, "Conversion created successfully"));
})

const getAllConversions = asyncHandler(async (req, res) => {
    const conversions = await Conversion.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user"
            }
        }
    ])
    if(!conversions || conversions.length === 0) {
        throw new ApiError(404, "No conversions found");
    }
    res.status(200).json(new ApiResponse(200, {conversions}, "Conversions retrieved successfully"));
});

const getConversionById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if(!mongoose.isValidObjectId(id)){
        throw new ApiError(400, "Invalid Conversion ID");
    }
    const conversion = await Conversion.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(id) } },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user"
            }
        }
    ])
    if(!conversion){
        throw new ApiError(404, "Conversion not found");
    }
    res.status(200).json(new ApiResponse(200, conversion, "Conversion retrieved successfully"));
})

const updateConversion = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    if(!mongoose.isValidObjectId(id)){
        throw new ApiError(400, "Invalid Conversion ID");
    }
    if(!content) {
        throw new ApiError(400, "Content is required");
    }
    const conversion = await Conversion.findByIdAndUpdate(id, { content }, { new: true });
    if(!conversion) {
        throw new ApiError(404, "Conversion not found");
    }
    res.status(200).json(new ApiResponse(200, conversion, "Conversion updated successfully"));
})

const deleteConversion = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if(!mongoose.isValidObjectId(id)){
        throw new ApiError(400, "Invalid Conversion ID");
    }
    const conversion = await Conversion.findByIdAndDelete(id);
    if(!conversion) {
        throw new ApiError(404, "Conversion not found");
    }
    res.status(200).json(new ApiResponse(200, conversion, "Conversion deleted successfully"));
})

export {
    createConversion,
    getAllConversions,
    getConversionById,
    updateConversion,
    deleteConversion
}