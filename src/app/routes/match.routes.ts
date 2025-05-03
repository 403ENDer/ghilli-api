import { MatchController } from '../controllers/matchController';
import { Router } from 'express';

const matchRouter = Router();

matchRouter.get('/:id', MatchController.getMatch);
matchRouter.get('/', MatchController.getAllMatches);
matchRouter.post('/', MatchController.createMatch);
matchRouter.put('/:id', MatchController.updateMatch);
matchRouter.delete('/:id', MatchController.deleteMatch);

export default matchRouter;

/**
 * @swagger
 * tags:
 *   name: Matches
 *   description: Match operations
 */

/**
 * @swagger
 * /api/matches:
 *   get:
 *     summary: Get all matches
 *     tags: [Matches]
 *     responses:
 *       200:
 *         description: A list of matches
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Match'
 *                 status:
 *                   type: integer
 *                   example: 200
 *       500:
 *         description: Failed to fetch matches
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to fetch matches
 *                 status:
 *                   type: integer
 *                   example: 500
 */

/**
 * @swagger
 * /api/matches/{id}:
 *   get:
 *     summary: Get a match by ID
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The match ID
 *     responses:
 *       200:
 *         description: Match data
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    type: object
 *                    $ref: '#/components/schemas/Match'
 *       404:
 *         description: Match not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Match not found
 *                 status:
 *                   type: integer
 *                   example: 404
 *       500:
 *         description: Failed to get match
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to get match
 *                 status:
 *                   type: integer
 *                   example: 500
 */

/**
 * @swagger
 * /api/matches:
 *   post:
 *     summary: Create a new match
 *     tags: [Matches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *             $ref: '#/components/schemas/MatchInputPayload'
 *     responses:
 *       201:
 *         description: Match created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/Match'
 *                 message:
 *                   type: string
 *                   example: Match created
 *                 status:
 *                   type: integer
 *                   example: 201
 *       500:
 *         description: Failed to create match
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to create match
 *                 status:
 *                   type: integer
 *                   example: 500
 */

/**
 * @swagger
 * /api/matches/{id}:
 *   put:
 *     summary: Update a match by ID
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The match ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MatchInputPayload'
 *     responses:
 *       200:
 *         description: Match updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Match'
 *                 message:
 *                   type: string
 *                   example: Match updated
 *                 status:
 *                   type: integer
 *                   example: 200
 *       404:
 *         description: Match not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Match not found
 *                 status:
 *                   type: integer
 *                   example: 404
 *       500:
 *         description: Failed to update match
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to update match
 *                 status:
 *                   type: integer
 *                   example: 500
 */

/**
 * @swagger
 * /api/matches/{id}:
 *   delete:
 *     summary: Delete a match by ID
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The match ID
 *     responses:
 *       200:
 *         description: Match deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Match deleted
 *                 status:
 *                   type: integer
 *                   example: 200
 *       404:
 *         description: Match not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Match not found
 *                 status:
 *                   type: integer
 *                   example: 404
 *       500:
 *         description: Failed to delete match
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to delete match
 *                 status:
 *                   type: integer
 *                   example: 500
 */
