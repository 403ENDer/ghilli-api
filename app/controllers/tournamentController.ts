import { tournamentModel } from "../model/tournamentModel";
import { createTournamentValidator } from "../validators/tournamentValidator";

export class TournamentController {
  public static async getTournament(req: any, res: any) {
    try {
      const id: string = req.params.id;
      console.log(id);
      if (!id) {
        return res.status(400).send({ error: "Tournament ID is required" });
      }
      const tournament = await tournamentModel.findById(id);
      if (!tournament) {
        return res.status(404).send({ error: "Tournament not found" });
      }
      return res.send({ data: tournament });
    } catch (error) {
      return res.status(500).send({ error: "Failed to fetch tournament" });
    }
  }

  public static async getAllTournaments(req: any, res: any) {
    try {
      const tournaments = await tournamentModel.find();
      return res.send({ data: tournaments });
    } catch (error) {
      return res.status(500).send({ error: "Failed to fetch tournaments" });
    }
  }

  public static async createTournament(req: any, res: any) {
    try {
      const data: any = req.body;
      console.log(data);

      const result = createTournamentValidator.safeParse(data);

      if (!result.success) {
        return res.status(400).json({ errors: result.error.format() });
      }

      const tournament = await tournamentModel.create(result.data);

      return res.status(201).send({ data: tournament });
    } catch (error) {
      return res.status(500).send({ error });
    }
  }

  public static async updateTournament(req: any, res: any) {
    try {
      const id: string = req.params.id;
      const data: any = req.body;
      if (!id) {
        return res.status(400).send({ error: "Tournament ID is required" });
      }
      const updatedTournament = await tournamentModel.findByIdAndUpdate(
        id,
        data,
        {
          new: true,
        }
      );
      if (!updatedTournament) {
        return res.status(404).send({ error: "Tournament not found" });
      }
      return res.send({ data: updatedTournament });
    } catch (error) {
      return res.status(500).send({ error: "Failed to update tournament" });
    }
  }

  public static async deleteTournament(req: any, res: any) {
    try {
      const id: string = req.params.id;
      if (!id) {
        return res.status(400).send({ error: "Tournament ID is required" });
      }
      const deletedTournament = await tournamentModel.findByIdAndDelete(id);
      if (!deletedTournament) {
        return res.status(404).send({ error: "Tournament not found" });
      }
      return res.send({ message: "Tournament deleted successfully" });
    } catch (error) {
      return res.status(500).send({ error: "Failed to delete tournament" });
    }
  }
}
