import express from "express";
import { createUser } from "../controller/user.controller.js";
import { body } from "express-validator";
// user routes
export const userRoutes = express();
// creating user
userRoutes.post(
  "/create_user",
  [
    body("email").notEmpty().withMessage("Please enter Email."),
    body("username").notEmpty().withMessage("Please enter username."),
    body("fullName").notEmpty().withMessage("Please enter full name."),
    body("password").notEmpty().withMessage("Please enter Password."),
    body("password").isLength({min:8}).withMessage("Password should contain more than 8 characters"),
    body("confirmPassword").notEmpty().withMessage("Please confirm Password."),
    body("email").isEmail().withMessage("Not a valid e-mail address."),
  ],
  createUser
);
