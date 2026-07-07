import { Router } from "express";
import { accessRefreshToken, getMe, userLogin, userLogout, userRegister } from "../controllers/user.controller.js";
import { isAuth } from "../middlewares/user.middleware.js";

// inizialize router
const router = Router();

// auth api's (public)
router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/refresh-token", accessRefreshToken);
router.get("/logout", userLogout);

// get user
router.get("/me", isAuth, getMe);

// export
export default router;