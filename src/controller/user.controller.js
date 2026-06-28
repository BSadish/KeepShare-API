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

const {username, email, password, collections, bookmarks} = req.body

if([username, email, password].some((field)=>field?.trim()==="")){
    throw new ApiError(400, "All field are required");
}

const existedUser= await User.findOne({
    $or:[{username}, {email}]
});

if(!existedUser){
    throw new ApiError(409, "User having same field is alread existes")
}
const user=await User.create({
    username, 
    email,
    password,
})
const createdUser= await User.findById(user._id).select("-password -refreshToken")

return res.status(201)
    .json(new ApiResponse(201, createdUser,"User registered successfully"))

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
    secure:true,
    sameSite:"strict"
}
return res.status(200)
.clearCookie("accessToken",options)
.clearCookie("refreshToken",options)
.json(new ApiResponse (200, {}, "User Logged Out Successfully"))
})

const refreshAccessToken=asyncHandler(async(req,res)=>{
    const incomingRefreshToken= await req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        throw new ApiError(401,"Unauthorized request")
    };
    try {
       const decodedToken= await jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
       
       const user=await User.findById(decodedToken?._id)
       if(!user){
            throw new ApiError(401, "invalid refresh token")

            if(incomingRefreshToken!==user?.refreshToken){
                throw new ApiError(401,"Refresh Token is expired or used")
            }

            const options={
                httpOnly:true,
                secure:true
            }
const {accessToken, newrefreshToken
}=await generateAccessAndRefreshToken(user._id)
return res.
        status(200)
        .cookie("accessToken",accessToken, options)
        .cookie("accessToken",newrefreshToken,options)
        .json(
             new ApiResponse(200,
                {accessToken, newrefreshToken},
                "Access token refreshed successfully"
            )
        )
        }
    } catch (error) {
        throw new ApiError(401, error?.message || "invalid refresh Token")
    }
})

const changeCurrentPassword=asyncHandler(async(req,res)=>{
const {oldPassword, newPassword}=req.body

const user= await User.findById(req.user?._id);

const isPasscordCorrect= await user.isPasswordCorrect(oldPassword)
if(!isPasswordCorrect){
    throw new ApiError(400,"invalid password");
}

user.password=newPassword
await user.save({validateBeforeSave:false})

return res
.status(200)
.json(new ApiResponse(200,{},"Password Changed Successfully"))

})

const getCurrentUser=asyncHandler(async(req,res)=>{
    return res.status(200)
    .json(200, req,user, "Current use Fetched Successfully")
})

const updateAccountDetails=asyncHandler(async(req,res)=>{
    const {username, email, password}=req.body

    if(!fullname || !email){
        throw new ApiError(401,"Usename or email required");
    }
    const user= User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                username,
                email
               
            }
        },
        {new:true}
    
    
    ).select("-password")

    return res.status(200)
    .json(new ApiResponse(200,user,"Accont details updated successfully"))
})







export {
    registerUser,
    loginUser,
    logOutUser,
    refreshAccessToken,
    changeCurrentPassword
}