import mongoose, { Schema } from "mongoose";

// create userSchema
const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 6,
    },
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
    }
}, { timestamps: true });

// create and export model
export const User = mongoose.model("User", userSchema);