import mongoose from "mongoose";
import jwt from 'jsonwebtoken'


const loginSchema = mongoose.Schema(
  {
    username: { type: String, unique: true, trim: true },
    password: { type: String },
  },
  { timestamps: true }



);

export default mongoose.model("Login", loginSchema);
