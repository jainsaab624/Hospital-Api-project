import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from 'cookie-parser';
import doctorRouter from "./src/features/doctors/doctors.routes.js";
import patientRouter from "./src/features/patients/patient.route.js";
import reportStatusRouter from "./src/features/reports-status/status.routes.js";
const app = express();

// Middleware to parse cookies
app.use(cookieParser());

//THIS IS THE BODY PARSER MIDDLEWARE
app.use(express.json());

app.get("/", (req, res) => {
  res.send("app is running");
});

// this is the doctors api route path
app.use("/api/doctors", doctorRouter);

app.use("/api/patients", patientRouter);

app.use("/api/reports",reportStatusRouter)

//HANDLING WRONG APIs
app.use((req, res) => {
  return res
    .status(404)
    .send("API NOT FOUND, Please Check The API And Try Again.");
});

export default app;
