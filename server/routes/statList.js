import express from "express";
import { getStatList } from "../controllers/statList.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getStatList);

export default router;
