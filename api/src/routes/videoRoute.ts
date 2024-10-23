import { Router } from "express";

const videoRoute = Router();

videoRoute.get("/", (req, res) => {
  res.send("ruteandooo desde los videos!!!!");
});

export default videoRoute;
