import express from "express";
import cors from "cors";
import { routes } from "./routes/routes.js";

// creating app instance
export const app = express();
app.use(cors()); // using cors

app.use(express.json()); // for taking request in json format

app.use(express.urlencoded()); // alternative for body-parser

app.use("/api", routes); // calling api routes
