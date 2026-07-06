import mongoose from "mongoose";

// connectDB function 
const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/FoodiHub`);
        console.log("DB connected successfully");
    } catch (error) {
        console.log("Failed to connect DB : ", error);
        throw error;
    }
}

// export 
export default connectDB;