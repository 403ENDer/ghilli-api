import { Router } from 'express';
import { GroundController } from '../controllers/groundController';

const groundRouter = Router();

groundRouter.get('/', GroundController.getAllGround);
groundRouter.post('/', GroundController.createGround);
groundRouter.put('/:id', GroundController.updateGround);

export default groundRouter;

/**
 * @swagger
 * tags:
 *   name: Grounds
 *   description: Ground operations
 */

/**
 * @swagger
 * /api/ground:
 *   get:
 *     summary: Get all grounds
 *     tags: [Grounds]
 *     responses:
 *       200:
 *         description: A list of grounds
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Ground'
 *                 status:
 *                   type: integer
 *                   example: 200
 *       500:
 *         description: Failed to fetch grounds
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to fetch grounds
 *                 status:
 *                   type: integer
 *                   example: 500
 */

/**
 * @swagger
 * /api/ground:
 *   post:
 *     summary: Create a new ground
 *     tags: [Grounds]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *             $ref: '#/components/schemas/GroundInputPayload'
 *     responses:
 *       201:
 *         description: Ground created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/Ground'
 *                 message:
 *                   type: string
 *                   example: Ground created
 *                 status:
 *                   type: integer
 *                   example: 201
 *       500:
 *         description: Failed to create Ground
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to create ground
 *                 status:
 *                   type: integer
 *                   example: 500
 */

/**
 * @swagger
 * /api/ground/{id}:
 *   put:
 *     summary: Update a ground by ID
 *     tags: [Grounds]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ground ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GroundInputPayload'
 *     responses:
 *       200:
 *         description: Ground updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Ground'
 *                 message:
 *                   type: string
 *                   example: Ground updated
 *                 status:
 *                   type: integer
 *                   example: 200
 *       404:
 *         description: Ground not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ground not found
 *                 status:
 *                   type: integer
 *                   example: 404
 *       500:
 *         description: Failed to update Ground
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to update Ground
 *                 status:
 *                   type: integer
 *                   example: 500
 */
