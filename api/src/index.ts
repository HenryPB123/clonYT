import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/connectDB";

const app = express();
dotenv.config();
const PORT = 3000;

//Connection
connectDB();

app.get("/", (req, res) => {
  res.send("Aquí cagandola de nuevo, muchas gracias");
});

app.listen(PORT, async () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
