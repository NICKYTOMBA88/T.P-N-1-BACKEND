import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/")
  console.log("conectado")
}
export { connectDB };
