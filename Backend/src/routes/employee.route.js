// routes.js
import express from 'express';
import { getAllEmployees } from '../Controllers/admin.controller.js';
import { employeeAuthMiddleware } from '../middlewares/employee.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();


// Protected route to get employee information
router.route('/info').get(verifyJWT,employeeAuthMiddleware, getAllEmployees);


export default router;
