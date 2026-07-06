import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/db.config.js";

const PORT = process.env.PORT;

// startServer function 
const startServer = async () => {
    try {
        // connect to db
        await connectDB();

        // listen app
        app.listen(PORT, () => {
            console.log(`Sever is running on port : ${PORT}`);
        })
    } catch (error) {
        console.error("Failed to start application : ", error);
        process.exit(1);
    }
}

startServer();