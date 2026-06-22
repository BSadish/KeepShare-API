import { Router } from "express";
import { creatBookmark, getAllBookmarks, trackAndRedirect } from "../controller/bookmark.controller";
import { verifyJWT } from "../middleware/auth.middleware";
const router=Router()

router.route("/b/:bookmarkId").get(trackAndRedirect);


router.route("/").post(verifyJWT, creatBookmark);

router.route("/").get(verifyJWT, getAllBookmarks)

export default router;