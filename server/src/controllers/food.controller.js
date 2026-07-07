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

// update food (private)
const updateFood = async (req, res) => {
    try {
        // get food id and updated data from req.params
        const { id } = req.params;
        const updateData = req.body;

        const updatedFood = await Food.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedFood) {
            return res.status(404).json({
                message: "Food not found"
            })
        }

        return res.status(200).json({
            message: "Food updated successfully",
            updatedFood
        })
    } catch (error) {
        console.error("Internal server error during food updation: ", error);
        return res.status(500).json({
            message: "Internal server error during food updation"
        })
    }
}

// deleteFood (private)
const deleteFood = async (req, res) => {
    try {
        // get id from req.params
        const { id } = req.params;

        // find food and delete
        const food = await Food.findByIdAndDelete(id);

        // check food
        if (!food) {
            return res.status(404).json({
                message: "Food is not found"
            })
        }

        // return response
        return res.status(200).json({
            message: "Food deleted successfully",
            food
        })
    } catch (error) {
        console.error("Internal server error during food deletion: ", error);
        return res.status(500).json({
            message: "Internal server error during food deletion"
        })
    }
}

// export
export {
    addFood,
    getAllFood,
    getSingleFood,
    updateFood,
    deleteFood
}