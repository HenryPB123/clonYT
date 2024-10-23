import { Router } from "express";

const userRoute = Router();

userRoute.get("/", (req, res) => {
  res.send("ruteandooo desde usuarios!!!!");
});

export default userRoute;
