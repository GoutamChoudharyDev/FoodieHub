import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/token.utils.js";
import cookieOptions from "../utils/cookiesOptions.utils.js";
import jwt from "jsonwebtoken";

// register controller
const userRegister = async (req, res) => {
    try {
        // get data from frontend(req.body)
        const { fullName, email, password } = req.body;

        // validation 
        if (!fullName?.trim() || !email?.trim() || !password) {
            return res.status(400).json({
                message: "All feilds are required"
            })
        }

        // password validation 
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be atleast 6 character"
            })
        }

        // check if user exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            })
        }

        // hashed the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user 
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword
        })

        // response
        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        console.error("Internal server error during registration: ", error);
        return res.status(500).json({
            message: "Internal server error during registration"
        })
    }
}

// login controller
const userLogin = async (req, res) => {
    try {
        // get data from frontend(req.body)
        const { email, password } = req.body;

        // validation
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        // find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

        // verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

        // generate tokens 
        const accessToken = generateAccessToken(user._id, user.role);
        const refreshToken = generateRefreshToken(user._id, user.role);

        // set tokens in cookies
        res.cookie("accessToken", accessToken, {
            ...cookieOptions,
            maxAge: 15 * 60 * 1000 // 15 min

        })

        res.cookie("refreshToken", refreshToken, {
            ...cookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })

        // safeUSer
        const safeUser = {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role
        }

        // return response
        return res.status(200).json({
            message: "User logged in successfully",
            user: safeUser
        })

    } catch (error) {
        console.error("Internal server error during login: ", error);
        return res.status(500).json({
            message: "Internal server error during login"
        })
    }
}

// access refresh token controller
const accessRefreshToken = async (req, res) => {
    try {
        // get token 
        const token = req.cookies?.refreshToken;

        if (!token) {
            return res.status(401).json({
                message: "No refresh token found"
            })
        }

        // verify token
        const decoded = jwt.verify(token, process.env.REFRESH_SECRET_KEY);

        // find user
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        // generate new token
        const newAccessToken = generateAccessToken(user._id, user.role);

        // set in cookies
        res.cookie("accessToken", newAccessToken, {
            ...cookieOptions,
            maxAge: 15 * 60 * 1000
        })

        // response
        return res.status(200).json({
            message: "refresh token generated"
        })
    } catch (error) {
        console.error("Internal server error during refresh token: ", error);
        return res.status(500).json({
            message: "Internal server error during refresh token"
        })
    }
}

// logout controller
const userLogout = (req, res) => {
    try {
        res.clearCookie("accessToken", cookieOptions);
        res.clearCookie("refreshToken", cookieOptions);

        return res.status(200).json({
            message: "Logout successfully"
        })
    } catch (error) {
        console.error("Internal server error during user logout: ", error);
        return res.status(500).json({
            message: "Internal server error during user logout"
        })
    }
}

// exports contollers
export {
    userRegister,
    userLogin,
    accessRefreshToken,
    userLogout
}