import { Router } from "express";
import { create, get, update, remove } from "../controllers/task.controller.js";
const router = Router();

router.post("/:id", create);
router.get("/:id", get);
router.patch("/:id", update);
router.delete("/:id", remove);

export default router;
