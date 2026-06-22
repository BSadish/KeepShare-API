import express from "express";
import cors from "cors";
import cookieParser from "cookie-Parser";
import { errorHandler } from "./middleware/error.middleware";

const app=express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));
app.use(express.json({limit:"16kb"}));

app.use(express.urlencoded({extended:true, limit:"16kb"}));

app.use(cookieParser());

import userRouter from "./routes/user_routes";
import bookmarkRouter from "./routes/bookmark.routes";
import collectionRouter from "./routes/bookmark.routes"


app.use("/api/v1/users",userRouter);
app.use("/api/v1/bookmarks",bookmarkRouter);
app.use("/api/v1/collections",collectionRouter);

app.use(errorHandler);

export {app};