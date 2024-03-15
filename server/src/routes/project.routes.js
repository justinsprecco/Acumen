import { Router } from "express";
import {
  create,
  getAll,
  get,
  update,
  remove,
} from "../controllers/project.controller.js";
const router = Router();

router.post("/", create);
router.get("/", getAll);
router.get("/:id", get);
router.patch("/:id", update);
router.delete("/:id", remove);

export default router;
