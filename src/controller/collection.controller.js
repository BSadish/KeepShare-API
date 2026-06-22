import { asyncHandler } from "../util/asyncHandler.js";
import { ApiError } from "../util/ApiError.js";
import { ApiResponse } from "../util/ApiResponse.js";
import { Collection } from "../models/collection.model.js";


export const createCollection =asyncHandler(async(req,res)=>{
    const {name, description}=req.body;

    if(!name){

    throw new ApiError(400,"Collection name is must"
    )
    }

    const collection = await Collection.create({
        name,
        description,
        createdBy:req.user._id
    });
    return res.status(201).json(new ApiResponse(201, collection, "Collection created successfully"));
})

export const addBookmarkToCollection=asyncHandler(async(req,res)=>{
    const {collectionId, bookmarkId}=req.params;
    const collection=await Collection.findOneAndUpdate({_id:collectionId, createdBy:req.user._id},
        {$addToSet: {bookmarks:bookmarkId}},
        {new:true}
    ).populate("bookmarks");

    if(!collection){
        throw new ApiError(404," Collectoin not found")
    }
    return res.status(200).json(new ApiResponse(200, collection, "Bookmark added to collection"));
});

export const getCollectionDetails=asyncHandler(async(req,res)=>{
    const {collectionId}=req.params;

    const collection=await Collection.findOne({_id:collectionId, createdBy:req.user._id}).populate("bookmarks");
    if (!collection) {
        throw new ApiError(404, "Collection not found");
    }

    return res.status(200).json(new ApiResponse(200, collection, "Collection fetched successfully"));
});