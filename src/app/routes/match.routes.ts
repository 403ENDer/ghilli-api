import { MatchController } from "../controllers/matchController";
import { Router } from "express";

const matchRouter = Router();

matchRouter.get("/:id", MatchController.getMatch);
matchRouter.get("/", MatchController.getAllMatches);
matchRouter.post("/", MatchController.createMatch);
matchRouter.put("/:id", MatchController.updateMatch);
matchRouter.delete("/:id", MatchController.deleteMatch);

export default matchRouter;
