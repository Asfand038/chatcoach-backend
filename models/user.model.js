import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
      maxLength: [100, "Your name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      trim: true,
      maxLength: [100, "Your email cannot exceed 100 characters"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Please provide your date of birth"],
    },
    gender: {
      type: String,
      required: [true, "Please select your gender"],
      enum: ["female", "male", "other"],
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
      minLength: [6, "Your password must be at least 6 characters"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export { User };
