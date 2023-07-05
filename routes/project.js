import express from "express";

import { isAuthenticated } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/admin.js";

const router = express.Router();

router.post("/newproject", isAuthenticated, isAdmin, newProject);

router.get("/allprojects", isAuthenticated, isAdmin, getAllProjects);
router.get("/:id", isAuthenticated, isAdmin, getThisProject);

export default router;
