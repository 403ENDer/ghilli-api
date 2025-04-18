import { PlayerModel } from "../model/playerModel";
import { createPlayerValidator } from "../validators/playerValidator";

export class PlayerController {
  public static async getAllPlayers(req: any, res: any) {
    try {
      const players = await PlayerModel.find();
      return res.status(200).json({ data: players });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  public static async getPlayerById(req: any, res: any) {
    try {
      const { id } = req.params;
      const player = await PlayerModel.findById(id);
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }
      return res.status(200).json({ data: player });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  public static async createPlayer(req: any, res: any) {
    try {
      const data = createPlayerValidator.safeParse(req.body).data;
      console.log(data);
      const player = await PlayerModel.create(data);

      return res.status(201).json({ data: player });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  public static async updatePlayer(req: any, res: any) {
    try {
      const { id } = req.params;
      const updated = await PlayerModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updated) {
        return res.status(404).json({ message: "Player not found" });
      }
      return res.status(200).json({ data: updated });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  public static async deletePlayer(req: any, res: any) {
    try {
      const { id } = req.params;
      const deleted = await PlayerModel.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ message: "Player not found" });
      }
      return res.status(200).json({ message: "Player deleted" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
