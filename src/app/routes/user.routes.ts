import express from 'express';
import UserController from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/:id', UserController.getUserById);
userRouter.post('/', UserController.createUser);
userRouter.put('/:id', UserController.updateUser);
// userRouter.delete('/:id', UserController.deleteUser);
// commented delete user functionality because when the user tries to delete his account when his
// userId is registered as the adminId in the ground then it will become a mess.

export default userRouter;

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User operations
 */

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User data
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    type: object
 *                    $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *                 status:
 *                   type: integer
 *                   example: 404
 *       500:
 *         description: Failed to get User
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to get User
 *                 status:
 *                   type: integer
 *                   example: 500
 */

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *             $ref: '#/components/schemas/UserInputPayload'
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/User'
 *                 message:
 *                   type: string
 *                   example: User created
 *                 status:
 *                   type: integer
 *                   example: 201
 *       500:
 *         description: Failed to create User
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to create User
 *                 status:
 *                   type: integer
 *                   example: 500
 */

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Update a User by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInputPayload'
 *     responses:
 *       200:
 *         description: User updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *                 message:
 *                   type: string
 *                   example: User updated
 *                 status:
 *                   type: integer
 *                   example: 200
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *                 status:
 *                   type: integer
 *                   example: 404
 *       500:
 *         description: Failed to update User
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to update User
 *                 status:
 *                   type: integer
 *                   example: 500
 */

// /**
//  * @swagger
//  * /api/user/{id}:
//  *   delete:
//  *     summary: Delete a User by ID
//  *     tags: [User]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The User ID
//  *     responses:
//  *       200:
//  *         description: User deleted
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: User deleted
//  *                 status:
//  *                   type: integer
//  *                   example: 200
//  *       404:
//  *         description: User not found
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: User not found
//  *                 status:
//  *                   type: integer
//  *                   example: 404
//  *       500:
//  *         description: Failed to delete User
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: Failed to delete User
//  *                 status:
//  *                   type: integer
//  *                   example: 500
//  */
