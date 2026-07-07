import mongoose, { Schema } from "mongoose";

// create foodSchema 
const foodSchema = new Schema({
    title: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price can't be negligible"]
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        trim: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

// create and export model
export const Food = mongoose.model("Food", foodSchema);