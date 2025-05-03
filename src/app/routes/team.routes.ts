import { TeamsController } from '../controllers/teamController';
import { Router } from 'express';
const teamRouter = Router();

teamRouter.get('/:id', TeamsController.getTeam);
teamRouter.get('/', TeamsController.getAllTeams);
teamRouter.post('/', TeamsController.createTeam);
teamRouter.put('/:id', TeamsController.updateTeam);
teamRouter.delete('/:id', TeamsController.deleteTeam);

//Player operations
teamRouter.post('/:id/addPlayer', TeamsController.addPlayerSingle);
teamRouter.delete('/:id/removePlayer', TeamsController.removePlayer);

export default teamRouter;

/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: API for managing teams and their players
 */

/**
 * @swagger
 * /api/team:
 *   get:
 *     summary: Get all teams
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: List of all teams
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Team'
 */

/**
 * @swagger
 * /api/team/{id}:
 *   get:
 *     summary: Get a team by ID
 *     tags: [Teams]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the team to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Team found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Team'
 *       404:
 *         description: Team not found
 */

/**
 * @swagger
 * /api/team:
 *   post:
 *     summary: Create a new team
 *     tags: [Teams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamInputPayload'
 *     responses:
 *       201:
 *         description: Team created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Team'
 */

/**
 * @swagger
 * /api/team/{id}:
 *   put:
 *     summary: Update a team
 *     tags: [Teams]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the team to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamInputPayload'
 *     responses:
 *       200:
 *         description: Team updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Team'
 *       404:
 *         description: Team not found
 */

/**
 * @swagger
 * /api/team/{id}:
 *   delete:
 *     summary: Delete a team
 *     tags: [Teams]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the team to delete
 *     responses:
 *       200:
 *         description: Team deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Team deleted
 *                 status:
 *                   type: integer
 *                   example: 200
 *       404:
 *         description: Team not found
 */

/**
 * @swagger
 * /api/team/{id}/addPlayer:
 *   post:
 *     summary: Add a single player to a team
 *     tags: [Teams]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Team ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [player]
 *             properties:
 *               player:
 *                 type: string
 *                 description: Player ID to add
 *     responses:
 *       200:
 *         description: Player added to team
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Team'
 *       404:
 *         description: Team not found
 */

/**
 * @swagger
 * /api/team/{id}/removePlayer:
 *   delete:
 *     summary: Remove a player from a team
 *     tags: [Teams]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Team ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [playerId]
 *             properties:
 *               playerId:
 *                 type: string
 *                 description: Player ID to remove
 *     responses:
 *       200:
 *         description: Player removed from team
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Team'
 *       404:
 *         description: Team not found
 */
