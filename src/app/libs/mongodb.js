import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    // console.log("Connected to MongoDB.");
  } catch (error) {
    console.log("something went wrong"+error);
  }
};

export default connectMongoDB;