import patientModel from "./patient.model.js";
import ReportModel from "./reports.model.js";

export default class PatientController {
  async registerPatient(req, res) {
    try {
      const { name, phonenumber } = req.body;

      const existingPatient = await patientModel.findOne({
        name: name,
        phoneNumber: phonenumber,
      });

      if (existingPatient) {
        return res.status(200).json({
          message: "patient already registered",
          patient: existingPatient,
        });
      } else {
        const newPatient = new patientModel({
          name: name,
          phoneNumber: phonenumber,
        });

        await newPatient.save();

        return res.status(200).json({
          success: true,
          message: "patient registered successfully",
          patient: newPatient,
        });
      }
    } catch {
      return res.status(500).json({
        message: "internal server error",
      });
    }
  }

  async createReport(req, res) {
    const doctor = req._id;
    const patientId = req.params.id;
    const status = req.body.status;
    try {
      if (!status) {
        res.status(400);
        throw new Error("please enter the status");
      }

      const patientexist = await patientModel.findById({ _id: patientId });
      if (!patientexist) {
        return res.status(404).json({
          success: false,
          message: "Patient not found",
        });
      }

      // Create a new patient report
      const report = new ReportModel({
        createdBy: doctor,
        patient: patientId,
        status,
      });

      // Save the report to the database
      await report.save();
      console.log("Report created:", report);
      return res
        .status(201)
        .json({ message: "Report created successfully", report });
    } catch (error) {
      return res.status(500).json({
        message: "internal server error",
      });
    }
  }

  async getAllReports(req, res) {
    const patientId = req.params.id;

    try {
      const reports = await ReportModel.find({ patient: patientId }).sort({
        date: "asc",
      });
      if (!reports) {
        return res.status(404).json({
          success: false,
          message: "no reports found",
        });
      }

      return res.status(200).json({
        success: true,
        reports: reports,
      });
    } catch (error) {
      return res.status(500).json({
        message: "internal server error",
      });
    }
  }
}
