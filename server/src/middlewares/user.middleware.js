import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// isAuth middleware
const isAuth = async (req, res, next) => {
    try {
        // take token from req.cookie
        const token = req.cookies?.accessToken;

        if (!token) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

        // verify token
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        req.user = user;

        next();
    } catch (error) {
        console.error("Authentication error:", error);

        return res.status(401).json({
            message: "Invalid or expired access token"
        });
    }
}

// isAdmin middleware
const isAdmin = (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "Unautherized access"
            })
        }

        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Access denied. Admin privileges required"
            })
        }

        return next();
    } catch (error) {
        console.error("Authorization error:", error);

        return res.status(500).json({
            message: "Internal server error during authorization",
        });
    }
}

// export
export {
    isAuth
}