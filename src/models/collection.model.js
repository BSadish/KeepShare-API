import mongoose from "mongoose";

const collectionSchema=new mongoose.Schema(
    ({
        name:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        bookmarks:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Bookmark"
        }]
    }



    ),{timestamps:true})

    export const Collection=mongoose.model("Collection",collectionSchema)