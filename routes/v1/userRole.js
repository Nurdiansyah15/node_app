import express from "express";
import {
  addUserRoleByNim,
  findUserRoleByNim,
  removeUserRoleByNim,
} from "../../controllers/v1/userRoleController.js";

const router = express.Router();

router.get("/userRole/:nim", findUserRoleByNim);
router.post("/userRole/:nim", addUserRoleByNim);
router.delete("/userRole/:nim", removeUserRoleByNim);

export default router;
