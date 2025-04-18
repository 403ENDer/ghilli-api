import { Router } from "express";
import { TournamentTeamsController } from "../controllers/tournamentTeamController";

const tournamenTeamRouter = Router();
tournamenTeamRouter.get("/:id", TournamentTeamsController.getById);
tournamenTeamRouter.post("/", TournamentTeamsController.addTeam);
tournamenTeamRouter.put("/:id", TournamentTeamsController.update);
tournamenTeamRouter.delete("/:id", TournamentTeamsController.delete);
tournamenTeamRouter.delete(
  "/:id/removeTeam",
  TournamentTeamsController.removeTeam
);

export default tournamenTeamRouter;
