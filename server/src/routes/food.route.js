import { Router } from "express";
import { isAdmin, isAuth } from "../middlewares/user.middleware.js";
import { addFood, deleteFood, getAllFood, getSingleFood, updateFood } from "../controllers/food.controller.js";

// router inizialize
const router = Router();

// food api's (Private)
router.post("/add", isAuth, isAdmin, addFood);

// food api's (Public)
router.get("/get-all", isAuth, getAllFood);

// single food (Public)
router.get("/:id", isAuth, getSingleFood);

// update food (Private)
router.put("/:id", isAuth, isAdmin, updateFood);

// delete 
router.delete("/:id", isAuth, isAdmin, deleteFood);

// exports
export default router;