import { Router } from "express";
import { isAdmin, isAuth } from "../middlewares/user.middleware.js";
import { addFood } from "../controllers/food.controller.js";

// router inizialize
const router = Router();

// food api's (Private)
router.post("/add", isAuth, isAdmin, addFood);


// exports
export default router;