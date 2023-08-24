import { apiResponse } from "../helper/utils.js";
import { user } from "../models/users.model.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  try {
    const { username, fullName, email, password, confirmPassword, contact } =
      req.body;
    if (password !== confirmPassword) {
      return apiResponse(res, {
        statusCode: 400,
        error: "Passwords don't match.",
      });
    }
    const userAlreadyExist = await user.findOne({
      $or: [{ email }, { username }],
    });
    if (userAlreadyExist) {
      return apiResponse(res, {
        statusCode: 409,
        error: "User already exist.",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userCreated = await user.create({
      role: "user",
      username,
      fullName,
      email,
      password: hashedPassword,
      contact,
    });
    if (userCreated) {
      return apiResponse(res, {
        statusCode: 200,
        message: "User created successfully.",
      });
    } else {
      return apiResponse(res, {
        statusCode: 500,
        error: "Problem while creating user, Please contact Administrator.",
      });
    }
  } catch (e) {
    return apiResponse(res, {
      statusCode: 500,
      error: e.message || "Problem while creating user.",
    });
  }
};
