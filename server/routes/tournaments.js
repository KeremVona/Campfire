import express from "express";
import authenticateUser from "../middleware/authMiddleware.js";
import { postTournamentHandler } from "../controllers/tournamentControllers/postTournamentsController.js";
import { getTournamentHandler } from "../controllers/tournamentControllers/getTournamentsController.js";
import { getTournamentByIdHandler } from "../controllers/tournamentControllers/getTournamentsIdController.js";
import { getTournamentMatchesHandler } from "../controllers/tournamentControllers/Tournament Details/getTournamentMatchesController.js";
import { getTournamentTeamsHandler } from "../controllers/tournamentControllers/Tournament Details/getTournamentTeamsController.js";
import { postTournamentApplicationsHandler } from "../controllers/tournamentControllers/Tournament Details/tournamentApplicationsController.js";

const router = express.Router();

router.post("/", authenticateUser, postTournamentHandler);
router.get("/", getTournamentHandler);
router.get("/:id", getTournamentByIdHandler);
router.get("/:id/teams", getTournamentTeamsHandler);
router.get("/:id/matches", getTournamentMatchesHandler);
router.post("/:id/apply", authenticateUser, postTournamentApplicationsHandler);
//router.post("/:id/join-team", authenticateUser, joinTournamentTeam);
//router.post("/matches/:matchId/report", authenticateUser, reportMatchResult);

export default router;
