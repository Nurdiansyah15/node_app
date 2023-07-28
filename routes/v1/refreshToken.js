import express from "express";
import { refreshToken } from "../../controllers/v1/refreshTokenController.js";

const router = express.Router();

router.get("/refreshToken", refreshToken);

export default router;
