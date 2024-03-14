import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import isAdmin from "../middlewares/admin.middleware.js"
import { createEmployee, createService, getAllAppointment, getAllEmployees ,getAllService,getAllUsersDetails, updateAppointment} from "../Controllers/admin.controller.js"
import { upload } from './../middlewares/multer.middleware.js';

const router = Router()

router.route('/get-all-users').get(verifyJWT,isAdmin,getAllUsersDetails)  

router.route('/get-all-employees').get(verifyJWT,isAdmin,getAllEmployees)

router.route('/registerEmployees').post(verifyJWT,isAdmin,createEmployee)

router.route('/createService').post(verifyJWT,isAdmin,upload.single('serviceImage'),createService)

router.route('/get-all-appointment').get(verifyJWT,isAdmin,getAllAppointment)

router.route('/update-appointment').patch(verifyJWT,isAdmin,updateAppointment)

router.route("/get-all-service").get(verifyJWT,isAdmin,getAllService)

export default router