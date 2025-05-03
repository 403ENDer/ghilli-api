import { Router } from 'express';
import { TournamentTeamsController } from '../controllers/tournamentTeamController';

const tournamenTeamRouter = Router();
tournamenTeamRouter.get('/:id', TournamentTeamsController.getById);
tournamenTeamRouter.post('/', TournamentTeamsController.addTeam);
tournamenTeamRouter.put('/:id', TournamentTeamsController.update);
tournamenTeamRouter.delete('/:id', TournamentTeamsController.delete);
tournamenTeamRouter.delete('/:id/removeTeam', TournamentTeamsController.removeTeam);

export default tournamenTeamRouter;

/**
 * @swagger
 * /api/tournamentTeam/{id}:
 *   get:
 *     summary: Get tournament-team mapping by ID
 *     tags: [TournamentTeam]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the tournament-team mapping
 *     responses:
 *       200:
 *         description: Mapping found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TournamentTeam'
 *       404:
 *         description: Not found
 */

/**
 * @swagger
 * /api/tournamentTeam:
 *   post:
 *     summary: Add a team to a tournament
 *     tags: [TournamentTeam]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teamId:
 *                 type: string
 *             required:
 *               - teamId
 *     responses:
 *       200:
 *         description: Team added successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/tournamentTeam/{id}:
 *   put:
 *     summary: Update tournament-team mapping
 *     tags: [TournamentTeam]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the mapping
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tournamentId:
 *                 type: string
 *               teamIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Updated successfully
 *       404:
 *         description: Not found
 */

/**
 * @swagger
 * /api/tournamentTeam/{id}:
 *   delete:
 *     summary: Delete tournament-team mapping by ID
 *     tags: [TournamentTeam]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Mapping ID
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       404:
 *         description: Not found
 */

/**
 * @swagger
 * /api/tournamentTeam/{id}/removeTeam:
 *   delete:
 *     summary: Remove a specific team from the tournament
 *     tags: [TournamentTeam]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Tournament-team mapping ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teamId:
 *                 type: string
 *             required:
 *               - teamId
 *     responses:
 *       200:
 *         description: Team removed successfully
 *       404:
 *         description: Mapping not found
 */
