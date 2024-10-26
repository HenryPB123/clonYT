import { Router } from "express";
import {
  addVideo,
  addView,
  deleteVideo,
  getByTag,
  getVideo,
  ramdom,
  search,
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
videoRoute.get("/tags", getByTag);
videoRoute.get("/search", search);

export default videoRoute;
