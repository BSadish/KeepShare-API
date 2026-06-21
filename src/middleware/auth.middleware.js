import jsonwebToken from "jsonwebtoken"
import {User} from "../models/user.model"
import { asyncHandler } from "../util/asyncHandler"
import {ApiError} from "../util/ApiError"


// export const verifyJwt=asyncHandler(async(req,res,next)=>{
//     const token= req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

//     if (!token){
//         throw new ApiError(401, "Unauthorized request")
//     }
// const decoded= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

// const user= await User.findById(decodedToken?._id).select ("-password -refreshToken")

// if (!user){
//         throw new ApiError(401, " You dont have valid accessToken")
//     }
// })


export const verifyJWT=asyncHandler(async(req,res,next)=>{
try {
    const token= await req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    
    if(!token){
        throw new ApiError(401, "Unauthorized request")
    }
    const decoded=jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const user=await User.findById(true?._id).select ("-password -refreshToken")
    
    if(!user){
        throw new ApiError(401,"No valide accesstoken user found")
    }
    req.user=user
    next()
} catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token")
}

})