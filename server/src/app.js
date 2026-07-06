import express from "express";

// app initialize
const app = express();

// default route
app.get("/", (req, res) => {
    res.send("Backend is running!")
})

// middlewares



// routes



// exports
export default app;