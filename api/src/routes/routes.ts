import { Router, Request, Response, NextFunction } from "express";
import userRoute from "./userRoute";
import videoRoute from "./videoRoute";
import commentRoute from "./commentRoute";
import authRoute from "./authRoute";
import { Error } from "mongoose";

const router = Router();

router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/videos", videoRoute);
router.use("/comments", commentRoute);

export default router;
