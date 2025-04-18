import playerRouter from "./player.routes";
import tournamenTeamRouter from "./tournamentTeams.routes";
import tournamentRouter from "./tournament.routes";
import matchRouter from "./match.routes";
import teamRouter from "./team.routes";

import { Router } from "express";
const indexRouter = Router();

indexRouter.use("/player", playerRouter);
indexRouter.use("/tournament", tournamentRouter);
indexRouter.use("/match", matchRouter);
indexRouter.use("/team", teamRouter);
indexRouter.use("/tournamentTeam", tournamenTeamRouter);

export default indexRouter;
