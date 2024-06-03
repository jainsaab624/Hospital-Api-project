import DoctorModel from "./doctors.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class DoctorsController {
  async registerDoctor(req, res) {
    try {
      const { username, password } = req.body;
      const existingDoctor = await DoctorModel.findOne({
        username: username,
      });

      if (existingDoctor) {
        return res.status(409).json({
          success: false,
          message: "username already exists",
        });
      } else {
        const hashedPassword = await bcrypt.hash(password, 12);

        const newDoctor = new DoctorModel({
          username: username,
          password: hashedPassword,
        });

        await newDoctor.save();

        return res.status(201).json({
          success: true,
          message: "doctor is registered successfully",
          doctor: newDoctor,
        });
      }
    } catch (error) {
      return new Error("internal server error");
    }
  }

  async loginDoctor(req, res) {
    try {
      const { username, password } = req.body;

      const doctor = await DoctorModel.findOne({ username: username });

      if (!doctor) {
        return res.status(404).json({
          success: false,
          message: "user not found",
        });
      }

      const validateDoctor = await bcrypt.compare(password, doctor.password);
      if (!validateDoctor) {
        return res.status(404).json({
          success: false,
          message: "passoword is wrong",
        });
      }

      const token = jwt.sign(
        {
          userId : doctor._id,
          username: doctor.username,
        },

        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.cookie("jwtToken", token, { maxAge: 1 * 60 * 60 * 1000, httpOnly: true });
      return res.status(200).json({
        success:true,
        message:"doctor is login successfully",
        Token: token
      })
    } catch (error) {
      return new Error("internal server error");
    }
  }
}
