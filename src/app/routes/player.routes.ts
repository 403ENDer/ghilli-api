import { PlayerController } from "../controllers/playerController";
import { Router } from "express";

const playerRouter = Router();
playerRouter.get("/", PlayerController.getAllPlayers);
playerRouter.get("/:id", PlayerController.getPlayerById);
playerRouter.post("/", PlayerController.createPlayer);
playerRouter.put("/:id", PlayerController.updatePlayer);
playerRouter.delete("/:id", PlayerController.deletePlayer);

export default playerRouter;
