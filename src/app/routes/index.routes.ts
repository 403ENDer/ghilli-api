import { Router } from 'express';
import playerRouter from './player.routes';
import tournamenTeamRouter from './tournamentTeams.routes';
import tournamentRouter from './tournament.routes';
import matchRouter from './match.routes';
import teamRouter from './team.routes';
import groundRouter from './ground.routes';
import userRouter from './user.routes';

const indexRouter = Router();

indexRouter.use('/player', playerRouter);
indexRouter.use('/tournament', tournamentRouter);
indexRouter.use('/match', matchRouter);
indexRouter.use('/team', teamRouter);
indexRouter.use('/tournamentTeam', tournamenTeamRouter);
indexRouter.use('/ground', groundRouter);
indexRouter.use('/user', userRouter);

export default indexRouter;
