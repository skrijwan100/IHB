import { Schema, model } from "mongoose";

const tourGuideSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    tourLocations: {
        type: [String], 
        required: true
    },
    languagesSpoken: {
        type: [String],
        required: true
    },
    experience: {
        type: String,
    },
    rating: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const TourGuide = model("TourGuide", tourGuideSchema);
export default TourGuide;