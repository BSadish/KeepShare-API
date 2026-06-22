import {Router} from "express"
import { loginUser, registerUser } from "../controller/user.controller"
import { verifyJWT } from "../middleware/auth.middleware"
const router=Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)


