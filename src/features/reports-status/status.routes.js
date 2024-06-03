import express from "express";
import reportStatus from "./status.controller.js";

const reportStatusRouter = express.Router();
const ReportStatusController = new reportStatus();

reportStatusRouter.get("/:status", ReportStatusController.reportStatus);

export default reportStatusRouter;
