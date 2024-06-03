import ReportModel from "../patients/reports.model.js";

export default class reportStatus {
  async reportStatus(req, res) {
    const {status} = req.params;
    console.log(status);
    try {
      const reports = await ReportModel.find({ status: status });
      if (!reports) {
        return res.status(404).json({
          success: false,
          message: "no reports found for this status",
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
