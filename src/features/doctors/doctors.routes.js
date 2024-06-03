import express from "express";
import DoctorsController from "./doctors.controller.js";

const doctorRouter = express.Router();
const doctorsController = new DoctorsController();

doctorRouter.post("/register", doctorsController.registerDoctor);
doctorRouter.post("/login", doctorsController.loginDoctor);

export default doctorRouter;
