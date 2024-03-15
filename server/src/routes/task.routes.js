import { Router } from "express";
import { create, getAllByProject } from "../controllers/task.controller.js";
const router = Router();

router.post("/", create);
router.get("/:id", getAllByProject);

export default router;
