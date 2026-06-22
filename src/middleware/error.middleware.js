import {ApiError} from "../util/ApiError";

export const errorHandler=(err,req,res,next)=>{
    let error=err;
    if(!(error instanceof ApiError)){
        const statusCode=error.statusCode ||500
        const message= error.message || "Server Error";
        error =new ApiError(statusCode, message, error?.errors, err.stack);
    }

    return res.status(error.statusCode)
    .json({
        success: error.success,
        message: error.message,
        errors: error.errors,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    })
}