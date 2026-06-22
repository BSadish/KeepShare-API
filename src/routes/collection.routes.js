import { Router } from "express";
import { createCollection, addBookmarkToCollection, getCollectionDetails } from "../controller/collection.controller";

import { verifyJWT } from "../middleware/auth.middleware";

const router= Router();

router.use(verifyJWT);

router.route("/").post(createCollection);
router.route("/:collectionId").get(getCollectionDetails);
router.route("/:collectionId/add/:bookmarkId").patch(addBookmarkToCollection);

export default router;

