import { Router } from "express";
import { bookAppointment, changeCurrentPassword, getAllFeedbacks, getAppointments, getCurrentUser, getFeedback, loginUser, logoutUser, refreshAccessToken, registerUser, sendMail, updateAccountDetails, updateUserAvatar } from "../Controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from './../middlewares/auth.middleware.js';
import { getAllService } from "../Controllers/admin.controller.js";

const router = Router()

router.route('/register').post(
    registerUser
)

router.route('/login').post(loginUser)

router.route('/get-all-services').get(getAllService)



// secured routes

router.route('/logout').post(verifyJWT,logoutUser)  // it first run verifyJWT then logoutUser because we use next() at the end of veriyJWT

router.route('/refreshToken').post(refreshAccessToken)

router.route('/change-password').patch(verifyJWT,changeCurrentPassword)

router.route('/profile').get(verifyJWT,getCurrentUser)    

router.route('/update-account').patch(verifyJWT,updateAccountDetails)

router.route('/updateAvatar').patch( 
    verifyJWT,
    upload.single("avatar"),
    updateUserAvatar)

router.route('/book-appointment').post(verifyJWT,bookAppointment)

router.route('/get-appointment').get(verifyJWT,getAppointments)
    
router.route('/feedback').post(verifyJWT,getFeedback)

router.route('/send-email').post(verifyJWT,sendMail)

router.route('/getAllFeedbacks').get(getAllFeedbacks)

export default router