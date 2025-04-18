import { TeamsController } from "../controllers/teamController";
import { Router } from "express";
const teamRouter = Router();

teamRouter.get("/:id", TeamsController.getTeam);
teamRouter.get("/", TeamsController.getAllTeams);
teamRouter.post("/", TeamsController.createTeam);
teamRouter.put("/:id", TeamsController.updateTeam);
teamRouter.delete("/:id", TeamsController.deleteTeam);

//Player operations
teamRouter.post("/:id/addPlayer", TeamsController.addPlayerSingle);
teamRouter.delete("/:id/removePlayer", TeamsController.removePlayer);

export default teamRouter;
