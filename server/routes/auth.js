import express from "express";
import validateAuth from "../middleware/validateAuth.js";
import {
  registerHandler,
  loginHandler,
  validateHandler,
} from "../controllers/authController.js";
import { getUserInformationHandler } from "../controllers/userInformationController.js";
import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", validateAuth, registerHandler);
router.post("/login", validateAuth, loginHandler);
router.get("/validate", validateHandler);
router.get("/user-information", authenticateUser, getUserInformationHandler);

export default router;
