import { TournamentController } from '../controllers/tournamentController';
import { Router } from 'express';

const tournamentRouter = Router();

tournamentRouter.get('/:id', TournamentController.getTournament);
tournamentRouter.get('/', TournamentController.getAllTournaments);
tournamentRouter.post('/', TournamentController.createTournament);
tournamentRouter.put('/:id', TournamentController.updateTournament);
tournamentRouter.delete('/:id', TournamentController.deleteTournament);

export default tournamentRouter;

/**
 * @swagger
 * tags:
 *   name: Tournament
 *   description: Tournament management
 */

/**
 * @swagger
 * /api/tournament:
 *   get:
 *     summary: Get all tournaments
 *     tags: [Tournament]
 *     responses:
 *       200:
 *         description: List of all tournaments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Tournament'
 *       500:
 *         description: Failed to fetch tournaments
 *
 *   post:
 *     summary: Create a new tournament
 *     tags: [Tournament]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TournamentInputPayload'
 *     responses:
 *       201:
 *         description: Tournament created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Tournament'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Failed to create tournament
 */

/**
 * @swagger
 * /api/tournament/{id}:
 *   get:
 *     summary: Get a single tournament by ID
 *     tags: [Tournament]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Tournament ID
 *     responses:
 *       200:
 *         description: Tournament data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Tournament'
 *       404:
 *         description: Tournament not found
 *       500:
 *         description: Failed to fetch tournament
 *
 *   put:
 *     summary: Update a tournament
 *     tags: [Tournament]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tournament ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TournamentInputPayload'
 *     responses:
 *       200:
 *         description: Tournament updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Tournament'
 *       404:
 *         description: Tournament not found
 *       500:
 *         description: Failed to update tournament
 *
 *   delete:
 *     summary: Delete a tournament
 *     tags: [Tournament]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tournament ID
 *     responses:
 *       200:
 *         description: Tournament deleted successfully
 *       404:
 *         description: Tournament not found
 *       500:
 *         description: Failed to delete tournament
 */
