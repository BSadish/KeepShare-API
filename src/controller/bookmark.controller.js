import { asyncHandler } from "../util/asyncHandler";
import { ApiError } from "../util/ApiError"
import { ApiResonse } from "../util/ApiResponse"
import { Bookmark } from "../models/bookmark.model";


export const creatBookmark=asyncHandler(async(req,res)=>{

const {title, url, description}=req.body

if(!title || !url){
    throw new ApiError(401,"Field are required");
}

const bookmark=await Bookmark.create({
    title,
    url,
    description,
    createdBy:req.user._id
})
return res.status(201).json(new ApiResponse(201, bookmark, "Bookmark created successfully"));

});

export const getAllBookmarks=asyncHandler (async (req,res)=>{
    const bookmarks=await Bookmark.find({createdBy:req.user._id});

    return res.status(201).json(new ApiResponse(200, bookmark, "Bookmark fetched successfully"));

});

export const trackAndRedirect=asyncHandler(async(req,res)=>{
    const {bookmarkId}=req.params;
    const bookmark= await Bookmark.findByIdAndUpdate(bookmarkId,
        {
            $inc:{clicks:1}
        },
        {new:true}
        
    );
    if(!bookmark)
    {
        throw new ApiError(404,"Bookmark not found")
    }

    return res.redirect(bookmark.url);
})