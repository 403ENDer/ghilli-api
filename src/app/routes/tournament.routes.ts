import { TournamentController } from "../controllers/tournamentController";
import { Router } from "express";

const tournamentRouter = Router();

tournamentRouter.get("/:id", TournamentController.getTournament);
tournamentRouter.get("/", TournamentController.getAllTournaments);
tournamentRouter.post("/", TournamentController.createTournament);
tournamentRouter.put("/:id", TournamentController.updateTournament);
tournamentRouter.delete("/:id", TournamentController.deleteTournament);

export default tournamentRouter;
