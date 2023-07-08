import express from "express";
import {
  getAllProjects,
  getThisProject,
  newProject,
  subscribe,
} from "../controllers/project.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/admin.js";

const router = express.Router();

router.post("/newproject", isAuthenticated, isAdmin, newProject);

router.get("/allprojects", isAuthenticated, getAllProjects);
router.get("/:id", isAuthenticated, isAdmin, getThisProject);
router.get("/subscribe/:id", isAuthenticated, subscribe);

export default router;
