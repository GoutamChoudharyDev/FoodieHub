import { Router } from "express";
import { isAdmin, isAuth } from "../middlewares/user.middleware.js";
import { addFood, getAllFood, getSingleFood } from "../controllers/food.controller.js";

// router inizialize
const router = Router();

// food api's (Private)
router.post("/add", isAuth, isAdmin, addFood);

// food api's (Public)
router.get("/get-all", isAuth, getAllFood);

// single food 
router.get("/:id", isAuth, getSingleFood);

// exports
export default router;