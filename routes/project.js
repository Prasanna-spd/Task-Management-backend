import express from "express";
import {
  getAllProjects,
  getProgress,
  getSubscribedProjects,
  getThisProject,
  newProject,
  subscribe,
} from "../controllers/project.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/admin.js";

const router = express.Router();

router.post("/newproject", isAuthenticated, isAdmin, newProject);

router.get("/allprojects", isAuthenticated, getAllProjects);
router.get("/subscribed", isAuthenticated, getSubscribedProjects);
router.get("/progress/:id", getProgress);
router.get("/subscribe/:id", isAuthenticated, subscribe);
router.get("/:id", isAuthenticated, isAdmin, getThisProject);

export default router;
