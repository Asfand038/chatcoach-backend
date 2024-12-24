import bcrypt from "bcrypt";
import axios from "axios";
import { User } from "../models/user.model.js";
import { resSuccess, resFailure } from "../utils/responseObject.utils.js";

const HASH_API_URL = "https://hashing-service.vercel.app/hash";

export const registerUser = async (req, res) => {
  try {
    const { email, password, name, dateOfBirth, gender } = req.body;

    // Call your custom hash API to hash the password
    const hashResponse = await axios.post(HASH_API_URL, {
      input: password,
    });

    if (!hashResponse.data || !hashResponse.data.hash) {
      throw new Error("Failed to hash password using custom API");
    }

    const hashedPassword = hashResponse.data.hash;

    console.log("password: ", password, "hashedPassword: ", hashedPassword);

    // Create the user
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      dateOfBirth,
      gender,
    });

    console.log("User created:", user);

    // Return success response
    return resSuccess(res, "User added to the system successfully", user);
  } catch (error) {
    console.error("Registration error:", error);
    return resFailure(res, "Registration error", error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return resFailure(res, "Email not registered", {}, 403);
    }

    // Call your custom hash API to hash the provided password
    const hashResponse = await axios.post(HASH_API_URL, {
      input: password,
    });

    if (!hashResponse.data || !hashResponse.data.hash) {
      throw new Error("Failed to hash password using custom API");
    }

    const hashedInputPassword = hashResponse.data.hash;

    // Compare provided hashed password with stored hashed password
    if (hashedInputPassword !== user.password) {
      return resFailure(res, "Incorrect password", {}, 403);
    }

    // Return success response with user details
    return resSuccess(res, "Login successful", {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return resFailure(res, "Login error", error);
  }
};
