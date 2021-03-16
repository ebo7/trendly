import express from "express";
import {
  addTimelinePoint,
  getTimeline,
  getNetworkTimeline,
} from "../controllers/timeline.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, addTimelinePoint);
router.get("/", auth, getTimeline);
router.get("/network", auth, getNetworkTimeline);

export default router;
