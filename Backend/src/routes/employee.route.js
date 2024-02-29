// routes.js
import express from 'express';
import { employeeAuthMiddleware } from '../middlewares/employee.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { getEmployeeInfo } from '../Controllers/employee.controller.js';

const router = express.Router();


// Protected route to get employee information
router.route('/info').get(verifyJWT,employeeAuthMiddleware, getEmployeeInfo);

export default router;
