import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";

// app initialize
const app = express();

// default route
app.get("/", (req, res) => {
    res.send("Backend is running!")
})

// middlewares
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", userRouter);


// exports
export default app;