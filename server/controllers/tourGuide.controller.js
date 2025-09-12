import mongoose from "mongoose";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import TourGuide from "../models/TourGuide.js";

const createTourGuide = asyncHandler(async (req, res) => {
    const { experience, tourLocations, languagesSpoken, phoneNumber, email, fullName } = req.body;
    if (!tourLocations || !phoneNumber || !email || !fullName || !languagesSpoken) {
        throw new ApiError(400, "Full Name, Email, Phone Number, Tour Locations, and Languages Spoken are required");
    }

    const existingGuide = await TourGuide.findOne({ email });
    if (existingGuide) {
        throw new ApiError(409, "Tour Guide with this email already exists");
    }

    const tourGuide = await TourGuide.create({
        experience,
        tourLocations,
        languagesSpoken,
        phoneNumber,
        email,
        fullName
    });

    if (!tourGuide) {
        throw new ApiError(500, "Failed to create tour guide");
    }

    res.status(201).json(new ApiResponse(201, tourGuide, "Tour Guide created successfully"));
});

const getAllTourGuides = asyncHandler(async (req, res) => {
    const tourGuides = await TourGuide.find();
    if (!tourGuides || tourGuides.length === 0) {
        throw new ApiError(404, "No tour guides found");
    }
    res.status(200).json(new ApiResponse(200, tourGuides, "Tour Guides retrieved successfully"));
});

const getTourGuideById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid Tour Guide ID");
    }

    const tourGuide = await TourGuide.findById(id);
    if (!tourGuide) {
        throw new ApiError(404, "Tour Guide not found");
    }

    res.status(200).json(new ApiResponse(200, tourGuide, "Tour Guide retrieved successfully"));
});

const getTourGuideByEmail = asyncHandler(async (req, res) => {
    const { email } = req.params;
    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const tourGuide = await TourGuide.findOne({ email });
    if (!tourGuide) {
        throw new ApiError(404, "Tour Guide not found");
    }

    res.status(200).json(new ApiResponse(200, tourGuide, "Tour Guide retrieved successfully"));
});

const updateTourGuide = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { experience, tourLocations, languagesSpoken, phoneNumber, email, fullName } = req.body;

    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid Tour Guide ID");
    }

    const tourGuide = await TourGuide.findByIdAndUpdate(
        id,
        { experience, tourLocations, languagesSpoken, phoneNumber, email, fullName },
        { new: true }
    );

    if (!tourGuide) {
        throw new ApiError(404, "Tour Guide not found");
    }

    res.status(200).json(new ApiResponse(200, tourGuide, "Tour Guide updated successfully"));
});

const ratingTourGuide = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { rating } = req.body;

    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid Tour Guide ID");
    }

    if (!rating || rating < 1 || rating > 5) {
        throw new ApiError(400, "Rating must be between 1 and 5");
    }

    const tourGuide = await TourGuide.findByIdAndUpdate(id, { rating }, { new: true });

    if (!tourGuide) {
        throw new ApiError(404, "Tour Guide not found");
    }

    res.status(200).json(new ApiResponse(200, tourGuide, "Tour Guide rated successfully"));
});

const deleteTourGuide = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid Tour Guide ID");
    }

    const tourGuide = await TourGuide.findByIdAndDelete(id);

    if (!tourGuide) {
        throw new ApiError(404, "Tour Guide not found");
    }

    res.status(200).json(new ApiResponse(200, tourGuide, "Tour Guide deleted successfully"));
});

export {
    createTourGuide,
    getAllTourGuides,
    getTourGuideById,
    getTourGuideByEmail,
    updateTourGuide,
    ratingTourGuide,
    deleteTourGuide
};
