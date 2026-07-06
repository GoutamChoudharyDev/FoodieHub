import mongoose, { Schema } from "mongoose";

// create userSchema
const userSchema = new Schema({

}, { timestamps: true });

// create and export model
export const User = mongoose.model("User", userSchema);