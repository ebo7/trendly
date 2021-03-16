import express from "express";
import {
  getStat,
  addLog,
  updateStat,
  addStat,
  getStats,
  addCategory
} from "../controllers/stat.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getStat);
router.get("/many", auth, getStats);
router.patch("/addLog", auth, addLog);
router.patch("/updateStat", auth, updateStat);
router.post("/", auth, addStat);
router.post("/addCategory", auth, addCategory)

export default router;
