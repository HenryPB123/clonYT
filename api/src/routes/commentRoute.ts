import { Router } from "express";

const commentRoute = Router();

commentRoute.get("/", (req, res) => {
  res.send("ruteandooo!!!!");
});

export default commentRoute;
