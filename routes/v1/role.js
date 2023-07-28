import express from "express";
import {
  createRole,
  deleteRoleById,
  findAllRoles,
  findRoleById,
  updateRoleById,
} from "../../controllers/v1/roleController.js";
const router = express.Router();

router.get("/roles", findAllRoles);
router.post("/roles", createRole);
router.get("/roles/:id", findRoleById);
router.put("/roles/:id", updateRoleById);
router.delete("/roles/:id", deleteRoleById);

export default router;
