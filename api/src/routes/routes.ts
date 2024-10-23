import { Router } from "express";
import userRoute from "./userRoute";
import videoRoute from "./videoRoute";
import commentRoute from "./commentRoute";

const router = Router();

router.use("/users", userRoute);
router.use("/videos", videoRoute);
router.use("/comments", commentRoute);

export default router;
