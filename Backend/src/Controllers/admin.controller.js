import { User } from "../Models/user.models.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import {Employee} from './../Models/employee.model.js';

const getAllUsersDetails = asyncHandler(async (req, res) => {
    try {
        const users = await User.find({ role: 'customer' });

        if (!users || users.length === 0) {
            throw new ApiError(404, "No user found!");
        }

        console.log("All Users:", users);
        return res
            .status(200)
            .json(new ApiResponse(200, users, "All user details fetched!"));
    } catch (error) {
        console.error("Error fetching users:", error.message);
        throw new ApiError(500, "Internal Server Error");
    }
});


// Controller to insert a new employee or associate an existing user as an employee
const createEmployee = asyncHandler(async (req, res) => {
  // Extract employee details from the request body
  const { username, email, fullName, phoneNumber, address, position, monthlyPays, avatar, password } = req.body;

  try {
    // Validate that required fields are present in the request body
    if (!username || !email || !fullName || !phoneNumber) {
      throw new ApiError(400, 'Missing required fields for creating a new user.');
    }

    // Check if there is an existing user with the role 'employee'
    let user = await User.findOne({ $or: [{ username }, { email }], role: 'employee' });

    // If no existing user found, create a new user
    if (!user) {
      user = new User({
        username,
        email,
        fullName,
        phoneNumber,
        address, // You may adjust this based on your schema
        role: 'employee',
        password
      });

      // Save the user without triggering the pre('save') hook for password hashing
      await user.save();
    }

    // Create a new employee using the found or created user's ObjectId
    const employee = await Employee.create({
      user: user._id,
      position,
      monthlyPays,
      avatar,
    });

    // Respond with the created employee details
    return res.status(201).json(new ApiResponse(201, employee, 'Employee registered successfully!'));
  } catch (error) {
    console.error('Error registering employee:', error.message);

    // Handle unique constraint violation
    if (error.code === 11000) {
      throw new ApiError(400, 'Duplicate email or username. Please use a different email or username.');
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      throw new ApiError(400, error.message);
    }

    throw new ApiError(500, 'Internal Server Error');
  }
  });



const getAllEmployees = asyncHandler(async(req,res)=>{

    try {
        const employees = await Employee.find({}).populate({
            path: 'User',
            matches:{'role':'employee'},
            select: '-password -subscriptions -refreshToken',
        }).exec();

        if (!employees || employees.length === 0) {
            throw new ApiError(404, "No employee found!");
        }

        console.log("All Employees:", employees);
        return res
            .status(200)
            .json(new ApiResponse(200, employees, "All user details fetched!"));
    } catch (error) {
        console.error("Error fetching employees:", error.message);
        throw new ApiError(404, "No employee found!");
    }
})







export { 
    getAllUsersDetails ,
    getAllEmployees,
    createEmployee
    }