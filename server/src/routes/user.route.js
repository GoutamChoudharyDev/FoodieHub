import { Router } from "express";
import { accessRefreshToken, userLogin, userLogout, userRegister } from "../controllers/user.controller.js";

// inizialize router
const router = Router();

// auth api's (public)
router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/refresh-token", accessRefreshToken);
router.get("/logout", userLogout);

// export
export default router;