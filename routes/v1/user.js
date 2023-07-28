import express from "express";
import {
  deleteUserByNim,
  findAllUsers,
  findUserByNim,
  updateUserByNim,
} from "../../controllers/v1/userController.js";
const router = express.Router();

router.get("/users", findAllUsers);
router.get("/users/:nim", findUserByNim);
router.put("/users/:nim", updateUserByNim);
router.delete("/users/:nim", deleteUserByNim);

export default router;
