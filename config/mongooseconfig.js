import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("successfully connected to mongoose database");
  } catch (error) {
    console.log("there was something wrong on connecting to database", error);
  }
};

export default connectDb;
