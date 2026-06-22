import {ApiError} from "../util/ApiError"
import {asyncHandler} from "../util/asyncHandler"
import {ApiResponse} from "../util/ApiResponse"
import { join } from "node:path"
import { User } from "../models/user.model"


const generateAccessAndRefreshToken=async(userId)=>{
    try {
        const user= await User.findById(userId)
        const accessToken=user.generateAcceessToken()
        const refreshToken=user.generateRefreshToken()

        user.refreshToken=refreshToken
        await user.save({validateBeforeSave:false})

        return {accesToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh token")
    }
}



const registerUser=asyncHandler(async(req,res)=>{

})

const loginUser=asyncHandler(async(req,res)=>{

const {username, email, password}=req.body

if (!username && !email){
    throw new ApiError(401,"Username or Email required");
}

const user= await User.findOne({
    $or:[{username},{email}]
})

if (!user){
    throw new ApiError(401,"User Doesnot Exit")
}

const isVallidPassowrd= await user.isPasswordCorrect(password)
if (!isValidPassword) {
        throw new ApiError(401, "Invalid user credentials")
    }
const {accessToken, refreshToken}= await generateAccessAndRefreshToken(user._id)


const loggedInUser= await User.findById(user._id)
.select("-password -refreshToken");

const options={
    httpOnly:true,
    secure:true
}


return res.status(200)
.cookie("accessToken",accessToken, options)
.cookie("refreshToken",refreshToken,options)
.json(
    new ApiResponse(200, 
        {
        user:loggedInUser, accessToken, refreshToken}),
    "User Logged in Successfully"
)



})

const logOutUser=asyncHandler(async(req,res)=>{
await User.findByIdAndUpdate(
    req.user._id,  //mongoose search for user name with this id name and $set which is an mongoose update operator change the field inside the req.user._id object so before refreshtoken=kdsflasdjf555 now after $set refreshtoken:undefined
    {
        $set:{
            refreshToken:undefined
        }
    },
        {
            new:true //return updated docuement llike refershtoken will be updated to undefined with new:true, if new is not used database will return new value but user gets the old valude as refreshtoken=ksdjflsdkw3
        }
    
)
const options={
    httpOnly:true,
    secure:true
}
return res.status(200)
.clearCookie("accessToken",options)
.clearCookie("refreshToken",options)
.json(new ApiResponse (200, {}, "User Logged Out Successfully"))
})


export {
    registerUser,
    loginUser,
    logOutUser
}