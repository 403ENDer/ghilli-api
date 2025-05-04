import { Request, Response } from 'express';
import { UserModel } from '../model/userModel';

class UserController {
  // Create a new user
  async createUser(req: Request, res: Response): Promise<any> {
    try {
      const data = req.body;
      const user = new UserModel(data);
      await user.save();
      return res.status(201).send({ data: user });
    } catch (err) {
      return res.status(400).send({ error: 'Failed to create user', details: err });
    }
  }

  // Get a user by ID
  async getUserById(req: Request, res: Response): Promise<any> {
    try {
      const { id: userId } = req.params;
      if (!userId) return res.status(400).send({ message: 'User ID is missing' });
      const user = await UserModel.findById(userId);
      if (!user) return res.status(404).send({ error: 'User not found' });
      return res.status(200).send(user);
    } catch (err) {
      return res.status(500).send({ error: 'Failed to fetch user', details: err });
    }
  }

  // Update a user by ID
  async updateUser(req: Request, res: Response): Promise<any> {
    try {
      const { id: userId } = req.params;
      if (!userId) return res.status(400).send({ message: 'User ID is missing' });
      if (userId != req.user?.id) return res.send(403).send({ message: 'User can only update their own profile' });
      const user = await UserModel.findByIdAndUpdate(userId, req.body, { new: true, runValidators: true });
      if (!user) return res.status(404).send({ error: 'User not found' });
      return res.status(200).send(user);
    } catch (err) {
      return res.status(400).send({ error: 'Failed to update user', details: err });
    }
  }

  // Delete a user by ID
  async deleteUser(req: Request, res: Response): Promise<any> {
    try {
      const { id: userId } = req.params;
      if (!userId) return res.status(400).send({ message: 'User ID is missing' });
      const user = await UserModel.findByIdAndDelete(userId);
      if (!user) return res.status(404).send({ error: 'User not found' });
      return res.status(200).send({ message: 'User deleted successfully' });
    } catch (err) {
      return res.status(500).send({ error: 'Failed to delete user', details: err });
    }
  }
}

export default new UserController();
