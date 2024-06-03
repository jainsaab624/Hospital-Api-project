import express from "express";
import PatientController from "./patient.controller.js";

import { auth } from "../../middlewares/jwt.middleware.js";

const patientRouter = express.Router();
const patientController = new PatientController();

patientRouter.post("/register", patientController.registerPatient);
patientRouter.post("/:id/create_report", auth,patientController.createReport);
patientRouter.get("/:id/all_reports",patientController.getAllReports)

export default patientRouter;
