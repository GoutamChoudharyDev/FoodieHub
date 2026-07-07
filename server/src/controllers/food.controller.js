import { Food } from "../models/food.model.js";

// addFood controller (private)
const addFood = async (req, res) => {
    try {
        // get id 
        const userId = req.user._id;

        // get data from frontend (req.body)
        const { title, description, image, price, category } = req.body;

        // validation
        if (!title || !description || !price || !category) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        // price validation
        if (price < 0) {
            return res.status(400).json({
                message: "Price can't be negligible"
            })
        }

        // create food
        const food = await Food.create({
            title,
            description,
            image,
            price,
            category,
            createdBy: userId
        })

        // response
        return res.status(201).json({
            message: "Food add successfully",
            food
        })
    } catch (error) {
        console.error("Internal server error during adding food: ", error);
        return res.status(500).json({
            message: "Internal server error during adding food"
        })
    }
}

// get all food (public)
const getAllFood = async (req, res) => {
    try {
        // get all food
        const foodItems = await Food.find().populate("createdBy", "fullName email role");

        // validation
        if (foodItems.length === 0) {
            return res.status(200).json({
                message: "No food items found",
                foodItems: []
            })
        }

        // return response
        return res.status(200).json({
            message: "Fetching all food items successfully",
            foodItems
        })

    } catch (error) {
        console.error("Internal server error during getting food items: ", error);
        return res.status(500).json({
            message: "Internal server error during getting food itmes"
        })
    }
}

// get single food (public)
const getSingleFood = async (req, res) => {
    try {
        // get id from params
        const { id } = req.params;
        console.log("food id", id);

        const singleFood = await Food.findById(id).populate("createdBy", "fullName email role");

        if (!singleFood) {
            return res.status(404).json({
                message: "Food not found"
            })
        }

        // return response
        return res.status(200).json({
            message: "Fetch food successfully",
            singleFood
        })
    } catch (error) {
        console.error("Internal server error during getting single food items: ", error);
        return res.status(500).json({
            message: "Internal server error during getting single food itmes"
        })
    }
}

// export
export {
    addFood,
    getAllFood,
    getSingleFood
}