import {ApiError} from "../util/ApiError"
import {asyncHandler} from "../util/asyncHandler"
import {User} from "../models/user.model"


const generateAccessAndRefreshToken=async(userId)=>{
    try {
        const user= await User.findById(userId)
        const accessToken=user.generateAccessToken()
        const refreshToken=user.refreshToken()

user.refreshToken=refreshToken
user.save({validateBeforeSave:false})


    } catch (error) {
        throw new ApiError(500,"Something Went wrong while extracting refresh and access Token")
    }
}


const registerUser=asyncHandler(async(req,res)=>{

})

const loginUser= asyncHandler(async(req,res)=>{

const{email,username,password}=req.body

if(!username || !email){
    throw new ApiError(400,"Username or password is required");
}
const user= await User.findOne({
    $or :[{username},{email}]
})

if(!user){
    throw new ApiError(401,"User Doesnot Exist")
}

const isPasswordValid=await user.isPasswowrdCorrect(password)

})
if(!isPasswordValid){
    throw new ApiError(401,"Enter correct Password")
}



export {
    registerUser,
    loginUser
}