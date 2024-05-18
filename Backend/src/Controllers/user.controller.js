import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { User } from "../Models/user.models.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { uploadOnCloudinary } from "../Utils/cloudinary.js";
import jwt from "jsonwebtoken";
import { Service } from "./../Models/services.model.js";
import { Appointment } from "../Models/appointment.model.js";
import { Feedback } from "../Models/feedback.model.js";
import nodemailer from 'nodemailer'

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access tokens"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fName, LName, username, email, password, phoneNumber, address } =
    req.body;
  console.log("br",req.body);
  // validation
  if (
    [fName, LName, email, username, password, phoneNumber].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required!!");
  }

  // user exist or not

  const existedUser = await User.findOne({
    $or: [{ email }, { username }], // check more than 1 field  using $or : [{1},{2},...]
  });

  if (existedUser) {
    throw new ApiError(409, "User Already Email or username already exist .");
  }

  const user = await User.create({
    fullName: `${fName} ${LName}`,
    avatar: "",
    email,
    password,
    username,
    phoneNumber,
    address,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(
      500,
      "Something went wrong while registering the user ."
    );
  }

  // Generate tokens after saving the user
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  // Assign refresh token to the user
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  const options = {
    // to secure cookie user can not modify
    httpOnly: true,
    secure: true,
  };
  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, createdUser, "User Registered Successfully !"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  // console.log('Request Body:', req.body);

  if (!(email || username)) {
    throw new ApiError(400, "Email is Required");
  }

  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    throw new ApiError(404, "user does not Exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Password incorrect");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    // to secure cookie user can not modify
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User Logged In Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: { refreshToken: 1 }, // this removes the field from document
    },
    {
      new: true, // return updated value
    }
  );

  const options = {
    // to secure cookie user can not modify
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unothorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh Token is Expired or Used");
    }
    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access Token Refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "invalid refresh token");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  
  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(406, "Invalid old Password !");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password Changed Successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  console.log(req.user);
  try {
    return res
      .status(200)
      .json(
        new ApiResponse(200, req.user, "current user fetched successfully")
      );
  } catch (error) {
    console.error("Error fetching current user:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, {}, "Error fetching current user"));
  }
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, phoneNumber, address } = req.body;

  if (!fullName || !phoneNumber || !address) {
    throw new ApiError(404, "All field are required");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName,
        address,
        phoneNumber,
      },
    },
    { new: true }
  ).select("-password ");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;
  console.log(avatarLocalPath);

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar.url) {
    throw new ApiError(400, "Error while uploading on avatar");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    { $set: { avatar: avatar.url } },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar updated successfully"));
});

const bookAppointment = asyncHandler(async (req, res) => {
  const currentUser = req.user;
  const { serviceId, scheduledDate, location, notes, price } = req.body;
  console.log("meri body",req.body)
  try {
    const existingAppointment = await Appointment.findOne({
      user: currentUser._id,
      service: serviceId,
      scheduledDate,
    });

    if (existingAppointment) {
      return res.status(409).json({
        success: false,
        message: "Appointment already booked for this user, service, and date.",
      });
    }

    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found!",
      });
    }

    const newAppointment = await Appointment.create({
      user: currentUser._id,
      service: serviceId,
      scheduledDate,
      location,
      notes,
      price
    });

    const populatedAppointment = await Appointment.findById(newAppointment._id)
      .populate({
        path: "user",
        model: "User",
        select: "-password -subscriptions -refreshToken",
      })
      .populate("service")
      .exec();

    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully!",
      data: populatedAppointment,
    });
  } catch (error) {
    console.log("meri body",error)
    return res.status(500).json({
      success: false,
      message: "Error booking appointment",
      error: error.message,
    });
  }
});

const getAppointments = asyncHandler(async (req, res) => {
  const currentUser = req.user;
  try {
    const appointment = await Appointment.find({ user: currentUser._id })
      .populate("service")
      .exec();

    if (appointment) {
      return res
        .status(201)
        .json(
          new ApiResponse(200, appointment, "Appointment fetched successfully!")
        );
    } else {
      console.log("User has no appointments.");
      return res.status(404).json({
        success: false,
        message: "Appointment not found!",
      });
    }
  } catch (error) {
    console.log("Error checking appointments:", error);
    throw new ApiError(400, "Error while fetching Appointment");
  }
});

const getFeedback = asyncHandler(async (req, res) => {
  const { ratings, comment } = req.body;


  const currentUser = req.user;
  try {
    const feedback = await Feedback.findOne({user:currentUser?._id});

    if (feedback) {
      return res.status(409).json({
        success: false,
        message: "Feedback already posted !",
      });
    }

    const newFeedback = await Feedback.create({
      user: currentUser?._id,
      ratings,
      comment,
    });
    
    const populatedFeedback = await Appointment.findById(newFeedback._id)
      .populate({
        path: "user",
        model: "User",
        select: "-password -subscriptions -refreshToken",
      })
      .populate({ path: "appointment", model: "Appointment" })
      .exec();

    return res.status(201).json({
      success: true,
      message: "Feedback posted successfully!",
      data: populatedFeedback,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error posting feedback",
      error: error.message,
    });
  }
});

const getAllFeedbacks = asyncHandler(async(req,res)=>{
  try {
    const feedbacks = await Feedback.find().populate('user', '-password -subscriptions -refreshToken');
    
    return res.status(200).json({
      success: true,
      data: feedbacks
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching feedbacks",
      error: error.message
    });
  }
});




const sendMail = asyncHandler(async(req, res)=>{
  
  const contactEmail = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      type: "login", // default
      user: "khansalikaziz787@gmail.com",
      pass: "kqvdpvifyamjzmvv"
    },
  });


contactEmail.verify((error) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error Sending email",
        error: error.message,
      });
    } else {
      console.log("Ready to Send");
    }
  });
    const name = req.body.name
    const email = req.body.email;
    const message = req.body.message;
    const phone = req.body.phone;
    const mail = {
      from: name,
      to: "khansalikaziz787@gmail.com",
      subject: "Contact Form Submission - Portfolio",
      html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Phone: ${phone}</p>
             <p>Message: ${message}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        res.json(error);
      } else {
        res.status(201).json({
          success: true,
          message: "Email Sent Successfully",
        });      }
    });
  });


export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  bookAppointment,
  getAppointments,
  getFeedback,
  sendMail,
  getAllFeedbacks
};

//signUp

//step 1 : get user detail from frontend
//step 2 : validation - not empty
//step 3 : check if user already exist : username ,email
//step 4 : check for images , check for avatar
//step 5 : upload them to cloudinary ,avatar
//step 6 : create user object - create entry in db
//step 6 : remove password and refresh token from response
//step 7 : check for user creation
//step 8 : return response

// Login

// step 1 : req body -- > data
// step 2 :username or email
// step 3: find the user
// step 4: password check
// step 6: access and refresh token
// step 7 :send cookie
//step 7 : send response for successfull login