import express from "express";
import db from "../db.js";
import authenticateUser from "../middleware/authMiddleware.js";
import { postGameHandler } from "../controllers/gameControllers/gamesController/postGamesController.js";
import { getGameHandler } from "../controllers/gameControllers/gamesController/getGamesController.js";
import { getIdGameHandler } from "../controllers/gameControllers/gamesController/getGamesIdController.js";
import { joinGameHandler } from "../controllers/gameControllers/joinLeaveController/joinController.js";
import { leaveGameHandler } from "../controllers/gameControllers/joinLeaveController/leaveController.js";
import { hasJoinedGameHandler } from "../controllers/gameControllers/joinLeaveController/hasJoinedController.js";
import { getPlayersGameHandler } from "../controllers/gameControllers/gamePlayerController/getGamePlayersController.js";
import { kickGameHandler } from "../controllers/gameControllers/joinLeaveController/kickController.js";
import { deleteGameHandler } from "../controllers/gameControllers/gamesController/deleteGameController.js";

const router = express.Router();

router.post("/games", authenticateUser, postGameHandler);
router.get("/games", authenticateUser, getGameHandler);
router.get("/games/:id", authenticateUser, getIdGameHandler);
router.post("/games/join", authenticateUser, joinGameHandler);
router.post("/games/leave", authenticateUser, leaveGameHandler);
router.get("/games/:id/has-joined", authenticateUser, hasJoinedGameHandler);
router.get("/games/:id/players", authenticateUser, getPlayersGameHandler);
router.post("/games/kick", authenticateUser, kickGameHandler);
router.delete("/games/:id", authenticateUser, deleteGameHandler);

export default router;
