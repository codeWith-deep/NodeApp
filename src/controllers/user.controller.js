
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { user } from "../models/user.models.js";
import { uploadOnCloundinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {

  //Get user details from frontend
  // Validation is not empty 
  // Check if User is already exists: Username Email
  //Check for images , avatar
  //Upload them to cloudinary, avatar
  //Create user object - Craate entery in db
  //Remove password and refresh token field from upload 
  //Check for user Creation 
  // Return response 

  const { fullName, email, username, password } = req.body
  console.log("from postman ", email)

  if ([fullName, email, username, password].some((field) =>

    field?.trim() === ""))
    {
      throw new ApiError(400, "All fields are required") 

    }
    const existedUser = user.findOne({
      $or: [{ username }, { email }]
    })

    if(existedUser){
      throw ApiError(409, "User with email or username already exists")
    }
    const avatarLocalPath = req.fiels?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if(!avatarLocalPath){
      throw new ApiError(400, "Avatar files is required")
    }
    const avatar = await uploadOnCloundinary(avatarLocalPath)
    const coverImage = await uploadOnCloundinary(coverImageLocalPath)

    if(!avatar){
      throw new ApiError(400, "Avatar files 2nd is required")

    }

    const user_add = await user.create({
      fullName,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      email,
      password,
      username: username.toLowerCase()
    })

    const createdUser = await user.findById(user._id).select("-password -refreshToken" )
    console.log(createdUser)

    if(!createdUser){
      throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"))
})





export { registerUser };