import {asyncHandler} from '../Utils/asyncHandler.js'
import {ApiError} from '../Utils/ApiError.js'
import { User } from '../Models/user.models.js'
import { ApiResponse } from '../Utils/ApiResponse.js'
import { uploadOnCloudinary } from '../Utils/cloudinary.js'
import jwt  from 'jsonwebtoken';

const generateAccessAndRefreshTokens = async (userId)=>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave:false})

        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating refresh and access tokens")
    }
}

const registerUser = asyncHandler(async(req,res)=>{
    const {fullName,username,email,password ,phoneNumber,address}=req.body

    // validation 
    if (
        [fullName,email,username,password,phoneNumber,address].some((field)=>
            field?.trim() === ""
        )
    ) {
        throw new ApiError(400,"All fields are required!!")
    }

    // user exist or not 

    const existedUser =await User.findOne({
        $or:[{ email },{ username }] // check more than 1 field  using $or : [{1},{2},...]
    })

    if(existedUser){
        throw new ApiError(409,"User Already Email or username already exist .")
    }


    const avatarLocalPath = req?.files?.avatar[0]?.path;   // req.file comes from multer
    console.log(avatarLocalPath)

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required !")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)  // using await to wait until upload successfull

    if(!avatar){
        throw new ApiError(400 , "Avatar file is required !")
    }

    const user = await User.create({
        fullName,
        avatar:avatar.url,
        email,
        password,
        username: username.toLowerCase(),
        phoneNumber,
        address
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user .")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User Registered Successfully !")
    )
})


const loginUser = asyncHandler(async (req,res)=>{
    const {email,username,password} = req.body


    if(!(email || username)){
        throw new ApiError(400,"Email is Required")
    }

    const user = await User.findOne({
        $or:[{email},{username}]
    })

    if(!user){
        throw new ApiError(404,"user does not Exist")
    }
    
    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401,"Password incorrect")
    }

    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id)
    .select("-password -refreshToken")


    const options = {   // to secure cookie user can not modify
        httpOnly :true, 
        secure : true
    }

    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user:loggedInUser,accessToken,refreshToken
            },
            "User Logged In Successfully"
        )
    )
})

const logoutUser =  asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{refreshToken:undefined}
        },
        {
            new:true  // return updated value
        }
    )

    const options = {   // to secure cookie user can not modify
        httpOnly :true, 
        secure : true
    }

    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User Logged Out"))

})


const refreshAccessToken = asyncHandler(async(req,res)=>{

    const incomingRefreshToken  = req.cookies.refreshToken || req.body.refreshToken
    if(!incomingRefreshToken){
        throw new ApiError(401,"Unothorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
            )
    
        const user  = await User.findById(decodedToken?._id)    
    
        if(!user){
            throw new ApiError(401,"Invalid refresh token")
        }
    
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401,"Refresh Token is Expired or Used")
        }
        const options = {
            httpOnly:true,
            secure:true
        }
    
        const {accessToken,newRefreshToken}  = await generateAccessAndRefreshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",newRefreshToken,options)
        .json(
            new ApiResponse(200,
                {accessToken,refreshToken :newRefreshToken},
                "Access Token Refreshed"
                )
        )
    } catch (error) {
        throw new ApiError(401,error?.message || "invalid refresh token")
    }

})

export {registerUser,loginUser,logoutUser ,refreshAccessToken}


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

