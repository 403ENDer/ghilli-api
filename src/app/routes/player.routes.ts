import { PlayerController } from '../controllers/playerController';
import { Router } from 'express';

const playerRouter = Router();

playerRouter.get('/', PlayerController.getAllPlayers);
playerRouter.get('/teams', PlayerController.getPlayerTeams);
playerRouter.get('/matches', PlayerController.getPlayerMatches);
playerRouter.get('/tournaments', PlayerController.getPlayerTournaments);
playerRouter.get('/playerStat', PlayerController.getPlayerStat);
playerRouter.get('/:id', PlayerController.getPlayerById);
playerRouter.post('/', PlayerController.createPlayer);
playerRouter.put('/:id', PlayerController.updatePlayer);
playerRouter.delete('/:id', PlayerController.deletePlayer);

export default playerRouter;

/**
 * @swagger
 * tags:
 *   name: Player
 *   description: Match operations
 */

/**
 * @swagger
 * /api/player:
 *   get:
 *     summary: Get all players
 *     tags: [Player]
 *     responses:
 *       200:
 *         description: List of players
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Player'
 *                 status:
 *                   type: integer
 *                   example: 200
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to fetch all players
 *                 error:
 *                   type: object
 *                   description: The error occured while fetching all players
 *                 status:
 *                   type: integer
 *                   example: 500

 *   post:
 *     summary: Create a new player
 *     tags: [Player]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlayerInputPayload'
 *     responses:
 *       201:
 *         description: Player created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Player'
 *                 status:
 *                   type: integer
 *                   example: 201
 *       500:
 *         description: Failed to create player
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to create player
 *                 error:
 *                   type: object
 *                   description: The error occured while creating a player
 *                 status:
 *                   type: integer
 *                   example: 500

 * /api/player/{id}:
 *   get:
 *     summary: Get a player by ID
 *     tags: [Player]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Player ID
 *     responses:
 *       200:
 *         description: Player found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Player'
 *                 status:
 *                   type: integer
 *                   example: 200
 *       404:
 *         description: Player not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Player not found
 *                 status:
 *                   type: integer
 *                   example: 404
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to get player by ID
 *                 error:
 *                   type: object
 *                   description: The error occured while getting a player by ID
 *                 status:
 *                   type: integer
 *                   example: 500

 *   put:
 *     summary: Update a player by ID
 *     tags: [Player]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Player ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlayerInputPayload'
 *     responses:
 *       200:
 *         description: Player updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Player'
 *                 status:
 *                   type: integer
 *                   example: 200
 *       404:
 *         description: Player not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Player not found
 *                 status:
 *                   type: integer
 *                   example: 404
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to update player
 *                 error:
 *                   type: object
 *                   description: The error occured while updating a player
 *                 status:
 *                   type: integer
 *                   example: 500

 *   delete:
 *     summary: Delete a player by ID
 *     tags: [Player]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Player ID
 *     responses:
 *       200:
 *         description: Player deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Player deleted
 *                 status:
 *                   type: integer
 *                   example: 200
 *       404:
 *         description: Player not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Player not found
 *                 status:
 *                   type: integer
 *                   example: 404
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to delete player
 *                 error:
 *                   type: object
 *                   description: The error occured while deleting a player
 *                 status:
 *                   type: integer
 *                   example: 500

 * /api/player/teams:
 *   get:
 *     summary: Get teams for a player
 *     tags: [Player]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Player ID
 *     responses:
 *       200:
 *         description: Teams retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Team'
 *                 status:
 *                   type: integer
 *                   example: 200
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to get player's teams
 *                 error:
 *                   type: object
 *                   description: The error occured while getting a player's team
 *                 status:
 *                   type: integer
 *                   example: 500

 * /api/player/matches:
 *   get:
 *     summary: Get matches for a player
 *     tags: [Player]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Player ID
 *     responses:
 *       200:
 *         description: Matches retrieved
 *       500:
 *         description: Server error

 * /api/player/tournaments:
 *   get:
 *     summary: Get tournaments for a player
 *     tags: [Player]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Player ID
 *     responses:
 *       200:
 *         description: Tournaments retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Tournament'
 *                 status:
 *                   type: integer
 *                   example: 200
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed getting player's tournaments
 *                 error:
 *                   type: object
 *                   description: The error occured while getting player's tournaments
 *                 status:
 *                   type: integer
 *                   example: 500

 * /api/player/playerStat:
 *   get:
 *     summary: Get stats for a player
 *     tags: [Player]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Player ID
 *     responses:
 *       200:
 *         description: Stats retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PlayerStats'
 *                 status:
 *                   type: integer
 *                   example: 200
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed getting player's stats
 *                 error:
 *                   type: object
 *                   description: The error occured while getting player's stats
 *                 status:
 *                   type: integer
 *                   example: 500
 */
