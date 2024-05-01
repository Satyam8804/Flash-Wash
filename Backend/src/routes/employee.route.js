// routes.js
import express from 'express';
import { employeeAuthMiddleware } from '../middlewares/employee.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { getAssignedAppointments, getEmployeeInfo } from '../Controllers/employee.controller.js';

const router = express.Router();


// Protected route to get employee information
router.route('/info').get(verifyJWT,employeeAuthMiddleware, getEmployeeInfo);
router.route('/get-assigned-work').get(verifyJWT,employeeAuthMiddleware,getAssignedAppointments)

export default router