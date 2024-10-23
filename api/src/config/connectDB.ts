import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      process.env.DB_CONNECTION as string
    );
    console.log(`MongoDB conectado: ${connection.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message); // Ahora TypeScript sabe que 'error' es de tipo 'Error'
    } else {
      console.error("Error desconocido", error);
    }
  }
};

export default connectDB;
