import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"
import dotenv from "dotenv"

dotenv.config({
    path:"./.env"
})

const connectDB=async(()=>{
try {
        const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URL}/DB_NAME`)
        console.log(`App running on DB Host ${connectionInstance.connection.host}`);
} catch (error) {
    console.log("Mongodb Connection Failed",error);
    process.exit(1)
}
})
