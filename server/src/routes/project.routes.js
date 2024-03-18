import { Router } from "express";
import {
  create,
  getTasks,
  get,
  getAll,
  update,
  remove,
} from "../controllers/project.controller.js";
const router = Router();

router.post("/", create);
router.get("/:id/tasks", getTasks);
router.get("/:id", get);
router.get("/", getAll);
router.patch("/:id", update);
router.delete("/:id", remove);

export default router;
