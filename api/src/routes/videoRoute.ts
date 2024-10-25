import { Router } from "express";
import {
  addVideo,
  addView,
  deleteVideo,
  getVideo,
  ramdom,
  subscriptions,
  trend,
  updateVideo,
} from "../controllers/videoControl";
import { verifyToken } from "../utils/verifyToken";

const videoRoute = Router();

videoRoute.post("/", verifyToken, addVideo);
videoRoute.put("/:id", verifyToken, updateVideo);
videoRoute.delete("/:id", verifyToken, deleteVideo);
videoRoute.get("/find/:id", getVideo);
videoRoute.put("/view/:videoId", addView);
videoRoute.get("/trend", trend);
videoRoute.get("/random", ramdom);
videoRoute.get("/subscriptions", verifyToken, subscriptions);

export default videoRoute;
