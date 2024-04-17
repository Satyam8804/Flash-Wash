// EmployeeController.js
import { Employee } from '../Models/employee.model.js';
import { ApiResponse } from '../Utils/ApiResponse.js';
import { asyncHandler } from '../Utils/asyncHandler.js';
import { ApiError } from '../Utils/ApiError.js';
import { Appointment } from '../Models/appointment.model.js';

const getEmployeeInfo = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const employee = await Employee.findOne({ user: userId }).populate('user').exec();
  if (!employee) {
    throw new ApiError(404, 'Employee not found');
  }
  res.json(new ApiResponse(200, employee, 'Employee information retrieved successfully'));
});


const getAssignedAppointments = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const employee = await Employee.findOne({user:userId}) 
    console.log("Employee Id ",employee?._id)
    const assignedAppointments = await Appointment.findOne({ employee: employee?._id })
    .populate("user")
    .populate("service")
    .exec()
    

    if(assignedAppointments){
      return res.status(200).json({
        success: true,
        message: 'Assigned appointments fetched successfully',
        data: assignedAppointments,
      });
    }else{
        console.log("No work assigned !!")
    }
  } catch (error) {
    console.error('Error fetching assigned appointments:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Error fetching assigned appointments',
    });
  }
});


export { getEmployeeInfo ,getAssignedAppointments};
