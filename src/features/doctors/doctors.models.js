import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const DoctorModel = mongoose.model("Doctor", doctorSchema);
export default DoctorModel;
