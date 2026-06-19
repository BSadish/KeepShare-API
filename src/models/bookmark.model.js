import mongoose from "mongoose";


const bookmarkSchema=new mongoose.Schema(
({
    title:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    clicks:{
        type:Number,
        default:0
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
}


),{timestamps:true})


export const Bookmark=mongoose.model("Bookmark",bookmarkSchema)