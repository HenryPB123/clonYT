import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB";
import router from "./routes/routes";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
const PORT = 3000;

//Connection
connectDB();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api", router);

app.listen(PORT, async () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
