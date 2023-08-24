import express from "express";
import { userRoutes } from "./user.routes.js";
export const routes = express();

//calling user routes
routes.use("/user", userRoutes);
