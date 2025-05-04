import { Request, Response } from 'express';
import { GroundModel } from '../model/groundModel';
import { createGroundValidator } from '../validators/groundValidator';

export class GroundController {
  public static async getAllGround(req: Request, res: Response): Promise<any> {
    try {
      const grounds = await GroundModel.find();
      return res.status(200).send({ data: grounds });
    } catch (error) {
      return res.status(500).send({ error: 'Failed to fetch grounds', details: error });
    }
  }

  public static async createGround(req: Request, res: Response): Promise<any> {
    try {
      // Validate request body
      const validatedData = createGroundValidator.parse(req.body);
      const adminId = req.user?.id;

      const data = {
        ...validatedData,
        adminId: adminId,
      };
      // Create ground
      const ground = new GroundModel(data);
      await ground.save();

      return res.status(201).send({ message: 'Ground created successfully', ground });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).send({ message: 'Validation Error', errors: error.errors });
      }

      return res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
  }

  public static async updateGround(req: any, res: any) {
    try {
      const groundId = req.params.id;
      const adminId = req.user?.id;
      const updateData = { ...req.body, admindId: adminId };
      const updatedGround = await GroundModel.findByIdAndUpdate(groundId, updateData, {
        new: true,
        runValidators: true,
      });
      if (!updatedGround) return res.status(404).send({ message: 'Ground not found' });
      return res.status(200).send({ message: 'Ground updated', data: updatedGround });
    } catch (error) {
      return res.status(500).send({ error: 'Failed to update Ground', details: error });
    }
  }
}
