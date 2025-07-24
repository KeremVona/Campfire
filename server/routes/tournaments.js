import express from "express";
import authenticateUser from "../middleware/authMiddleware.js";
import { postTournamentHandler } from "../controllers/tournamentControllers/postTournamentsController.js";
import { getTournamentHandler } from "../controllers/tournamentControllers/getTournamentsController.js";

const router = express.Router();

router.post("/", authenticateUser, postTournamentHandler);
router.get("/", getTournamentHandler);
//router.get("/:id", getTournamentDetails);
//router.post("/:id/join-team", authenticateUser, joinTournamentTeam);
//router.post("/matches/:matchId/report", authenticateUser, reportMatchResult);

export default router;
