import { User } from "../Models/user.models.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { Employee } from "./../Models/employee.model.js";
import { Service } from "../Models/services.model.js";
import { uploadOnCloudinary } from "../Utils/cloudinary.js";
import { Appointment } from "../Models/appointment.model.js";

const getAllUsersDetails = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({ role: "customer" });

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
  const {
    username,
    email,
    fullName,
    phoneNumber,
    address,
    position,
    monthlyPays,
    avatar,
    password,
  } = req.body;

  try {
    // Validate that required fields are present in the request body
    if (!username || !email || !fullName || !phoneNumber) {
      throw new ApiError(
        400,
        "Missing required fields for creating a new user."
      );
    }

    // Check if there is an existing user with the role 'employee'
    let user = await User.findOne({
      $or: [{ username }, { email }],
      role: "employee",
    });

    // If no existing user found, create a new user
    if (!user) {
      user = new User({
        username,
        email,
        fullName,
        phoneNumber,
        address, // You may adjust this based on your schema
        role: "employee",
        password,
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
    return res
      .status(201)
      .json(
        new ApiResponse(201, employee, "Employee registered successfully!")
      );
  } catch (error) {
    console.error("Error registering employee:", error.message);

    // Handle unique constraint violation
    if (error.code === 11000) {
      throw new ApiError(
        400,
        "Duplicate email or username. Please use a different email or username."
      );
    }

    // Handle validation errors
    if (error.name === "ValidationError") {
      throw new ApiError(400, error.message);
    }

    throw new ApiError(500, "Internal Server Error");
  }
});

const getAllEmployees = asyncHandler(async (req, res) => {
  try {
    const employees = await Employee.find({})
      .populate({
        path: "user",
        matches: { role: "employee" },
        select: "-password -subscriptions -refreshToken",
      })
      .exec();


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
});

// services

const createService = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    duration,
    isActive,
    category,
    vehicleType,
  } = req.body;

  if (
    [name, description, price, duration, isActive, category, vehicleType].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required!!");
  }

  const existedService = await Service.findOne({
    $or: [{ name }, { category }], // check more than 1 field  using $or : [{1},{2},...]
  });

  if (existedService) {
    throw new ApiError(409, "Service already exist .");
  }
  const serviceImageLocalPath = req?.file?.path || ""; // req.file comes from multer

  if (!serviceImageLocalPath) {
    throw new ApiError(400, "ServiceImage file is required !");
  }

  const serviceImage = await uploadOnCloudinary(serviceImageLocalPath); // using await to wait until upload successfull

  if (!serviceImage?.url) {
    throw new ApiError(400, "Avatar file is required !");
  }

  const services = await Service.create({
    name,
    description,
    price,
    duration,
    isActive,
    category,
    vehicleType,
    serviceImage: serviceImage?.url,
  });

  const createdService = await Service.findById(services._id);

  if (!createdService) {
    throw new ApiError(500, "Something went wrong while creating service .");
  }

  await services.save({ validateBeforeSave: false });

  return res
    .status(201)
    .json(
      new ApiResponse(200, createdService, "Service created Successfully !")
    );
});


const getAllService = asyncHandler(async (req, res) => {
  try {
    const allservices = await Service.find({});

    if (!allservices || allservices.length === 0) {
      throw new ApiError(404, "No employee found!");
    }
    console.log("All Services:", allservices);
    
    return res
      .status(200)
      .json(new ApiResponse(200, allservices, "All services details fetched!"));
  } catch (error) {
    console.error("Error fetching services:", error.message);
    throw new ApiError(404, "No service found!");
  }
});


const getAllAppointment = asyncHandler(async(req,res)=>{
    try {
      const appontments = await Appointment.find({})
      .populate("user","-password -refreshToken")
      .populate('service')
      .exec()
  
      if(!appontments || appontments.length === 0){
        throw new ApiError(404,"No appointment Available")
      }
      console.log("All Appointment:", appontments);
  
      return res.status(200)
      .json(
        new ApiResponse(200,appontments,"All appointment fetched ")
      )
  
    } catch (error) {
      console.error("Error fetching employees:", error.message);
      throw new ApiError(404, "No Appointment found!");
    }

})


const updateAppointment = asyncHandler(async(req,res)=>{
  try {
    const { _id, isConfirmed, workProgress } = req.body;

    console.log(_id , isConfirmed ,workProgress)

    const appointment = await Appointment.findById(_id);

    console.log(appointment)

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found!',
      });
    }

    if (isConfirmed) {
      appointment.isConfirmed = isConfirmed;
      appointment.workProgress = workProgress;

      await appointment.save();

      return res.status(200).json({
        success: true,
        message: 'Appointment updated successfully!',
        data: appointment,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Cannot update workProgress without confirming the appointment first.',
      });
    }
  } catch (error) {
    console.error('Error updating appointment:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Error updating appointment',
    });
  }
})

export { getAllUsersDetails, getAllEmployees, createEmployee, createService , getAllService ,getAllAppointment ,updateAppointment};
