import { Router } from "express";
import { changeCurrentPassword, getAllUsersDetails, getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails, updateUserAvatar } from "../Controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from './../middlewares/auth.middleware.js';
import isAdmin from "../middlewares/admin.middleware.js";

const router = Router()

router.route('/register').post(
    registerUser
)

router.route('/login').post(loginUser)



// secured routes

router.route('/logout').post(verifyJWT,logoutUser)  // it first run verifyJWT then logoutUser because we use next() at the end of veriyJWT

router.route('/refreshToken').post(refreshAccessToken)

router.route('/change-password').post(verifyJWT,changeCurrentPassword)

router.route('/profile').get(verifyJWT,getCurrentUser)    

router.route('/update-account').patch(verifyJWT,updateAccountDetails)

router.route('/updateAvatar').patch( 
    verifyJWT,
    upload.single("avatar"),
    updateUserAvatar)

router.route('/get-all-users').get(verifyJWT,isAdmin,getAllUsersDetails)  
    
export default router