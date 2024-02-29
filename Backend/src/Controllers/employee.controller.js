// EmployeeController.js
import { Employee } from '../Models/employee.model.js';
import { ApiResponse } from '../Utils/ApiResponse.js';
import { asyncHandler } from '../Utils/asyncHandler.js';
import { ApiError } from '../Utils/ApiError.js';

const getEmployeeInfo = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const employee = await Employee.findOne({ user: userId }).populate('user').exec();
  if (!employee) {
    throw new ApiError(404, 'Employee not found');
  }
  res.json(new ApiResponse(200, employee, 'Employee information retrieved successfully'));
});




export { getEmployeeInfo };
