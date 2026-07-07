import { Food } from "../models/food.model.js";

// addFood controller
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

// export
export {
    addFood,
}