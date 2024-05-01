import { ApiError } from "../Utils/ApiError.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import jwt from 'jsonwebtoken'
import { User } from "../Models/user.models.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    
        if (!token) {
            throw new ApiError(401, "Unauthorized Request");
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    
        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }
        
        // Check if the token has expired
        if (decodedToken.exp < Date.now() / 1000) {
            throw new ApiError(401, "Session expired");
        }
        
        req.user = user;
        next();
    } catch (error) {
        // Check if the error is due to token expiration
        if (error.name === 'TokenExpiredError') {
            // Send response indicating session expiration
            return res.status(401).json({ message: 'Session expired' });
        } else {
            throw new ApiError(401, error?.message || "Invalid Access Token");
        }
    }
});
