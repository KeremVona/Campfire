import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  postTournament,
  joinTournamentTeam,
  reportMatchResult,
  getAllTournaments,
  getTournamentDetails,
  // ... more handlers as needed
} from "../controllers/tournamentController.js";

const router = express.Router();

router.post("/", authenticateUser, postTournament);
router.get("/", getAllTournaments);
router.get("/:id", getTournamentDetails);
router.post("/:id/join-team", authenticateUser, joinTournamentTeam);
router.post("/matches/:matchId/report", authenticateUser, reportMatchResult);

export default router;
