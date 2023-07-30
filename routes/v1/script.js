import express from "express";
import {
  createScript,
  deleteScriptById,
  findAllScripts,
  findScriptById,
  updateScriptById,
} from "../../controllers/v1/scriptController.js";

const router = express.Router();

router.get("/scripts", findAllScripts);
router.get("/scripts/:id", findScriptById);
router.post("/scripts", createScript);
router.put("/scripts/:id", updateScriptById);
router.delete("/scripts/:id", deleteScriptById);

export default router;
