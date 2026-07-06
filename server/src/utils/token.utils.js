import jwt from "jsonwebtoken";

// generate access token
const generateAccessToken = (userId, userRole) => {
    return jwt.sign(
        {
            id: userId,
            role: userRole
        },

        process.env.ACCESS_SECRET_KEY,

        {
            expiresIn: process.env.ACCESS_EXPIRY
        }
    )
}

// generate refresh token
const generateRefreshToken = (userId, userRole) => {
    return jwt.sign(
        {
            id: userId,
            role: userRole
        },

        process.env.REFRESH_SECRET_KEY,

        {
            expiresIn: process.env.REFRESH_EXPIRY
        }
    )
}

// exports
export {
    generateAccessToken,
    generateRefreshToken
}