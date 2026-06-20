import {ApiError} from "../util/ApiError"
import {asyncHandler} from "../util/asyncHandler"
import {ApiResponse} from "../util/ApiResponse"
import { join } from "node:path"


// const generateAccessAndRefreshToken=



const registerUser=asyncHandler(async(req,res)=>{

})

const loginUser=asyncHandler(async(req,res)=>{

const {username, email, password}=req.body

if (!username || !email){
    throw new ApiError(401,"Username or Email required");
}

const user= await User.findOne({
    $or:[{username},{email}]
})

if (!user){
    throw new ApiError(401,"User Doesnot Exit")
}

const isVallidPassowrd= await user.isPasswordCorrect(password)



})


export {
    registerUser,
    loginUser
}