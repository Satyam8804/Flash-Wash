import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import isAdmin from "../middlewares/admin.middleware.js"
import { createEmployee, getAllEmployees ,getAllUsersDetails} from "../Controllers/admin.controller.js"

const router = Router()

router.route('/get-all-users').get(verifyJWT,isAdmin,getAllUsersDetails)  

router.route('/get-all-employees').get(verifyJWT,isAdmin,getAllEmployees)

router.route('/registerEmployees').post(verifyJWT,isAdmin,createEmployee)

export default router