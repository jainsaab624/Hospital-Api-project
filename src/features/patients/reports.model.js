import mongoose, { Schema } from "mongoose";

const reportSchema = new mongoose.Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  status: {
    type: String,
    enum: [
      "Negative",
      "Travelled-Quarantine",
      "Symptoms-Quarantine",
      "Positive-Admit",
    ],
    required: true,
  },
  date: { type: Date, default: Date.now },
});

const ReportModel = mongoose.model("Report", reportSchema);

export default ReportModel;
