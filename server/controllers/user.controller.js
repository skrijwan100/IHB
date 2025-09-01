import { ApiError } from "../utils/apiError.js";
import {ApiResponse} from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken"

const loginUser = asyncHandler(async (req, res) => {
    const {smartID, fullname} = req.body;
    if(!smartID || !fullname) {
        throw new ApiError(400, "Smart ID and Full Name are required");
    }

    const user = await User.findOne({
        $and: [{ smartID }, { fullname }]
    })
    if(!user){
        throw new ApiError(404, "user not found");
    }

    const accessToken = jwt.sign({
        _id : user._id,
        fullname : user.fullname,
        smartID : user.smartID
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    })


    return res.status(200).json(new ApiResponse(200, {accessToken, user}, "User logged in successfully"));
})


export {
    loginUser
}