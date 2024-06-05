
import { Timestamp } from "mongodb";
import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
      username: {
        type: String,
        required: true,
        lowercase: true,
        index:true,
        trim:true,
        unquie:true
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        trim:true,
        unquie:true
      },

      fullname: {
        type: String,
        required: true,
        lowercase: true,
        trim:true,
        unquie:true
      },

      avatar:{
        type: String, //cloudinary url
        required: true
      },
      coverImage:{
        type: String //cloudinary url
      },
      watchHistory:{
         type: Schema.Types.ObjectId,
         ref: "video"
      },
      password:{
        type: String,
        required: [true, "Password is required"]
      },
      refreshToken:{
        type: String

      },

}, {Timestamps: true}
)

userSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10 )
     next();
})

userSchema.methods.isPasswordCorrect = async function (password)
{
  return await  bcrypt.compare.compare(password, this.password)

}

userSchema.methods.generateAccessToken = function (){
  return jwt.sign({
    _id: this._id,
    email: this.email,
    username: this.username,
    fullname: this.fullname
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
  }


)
}


export const user = mongoose.model("user", userSchema)