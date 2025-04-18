import { tournamentTeamsModel } from "../model/tournamentTeamsModel";

export class TournamentTeamsController {
  public static async getAll(req: any, res: any) {
    try {
      const data = await tournamentTeamsModel.find();
      return res.status(200).send({ data });
    } catch (error) {
      return res.status(500).send({ error: "Fetch failed", details: error });
    }
  }

  public static async getById(req: any, res: any) {
    try {
      const id = req.params.id;
      const data = await tournamentTeamsModel.findById(id);
      if (!data) return res.status(404).send({ message: "Not found" });

      return res.status(200).send({ data });
    } catch (error) {
      return res.status(500).send({ error: "Fetch failed", details: error });
    }
  }

  public static async update(req: any, res: any) {
    try {
      const id = req.params.id;
      const { tournamentId, teamIds } = req.body;

      const updated = await tournamentTeamsModel.findByIdAndUpdate(
        id,
        { tournamentId, teamIds },
        { new: true, runValidators: true }
      );

      if (!updated) return res.status(404).send({ message: "Not found" });
      return res.status(200).send({ message: "Updated", data: updated });
    } catch (error) {
      return res.status(500).send({ error: "Update failed", details: error });
    }
  }

  public static async delete(req: any, res: any) {
    try {
      const id = req.params.id;
      const deleted = await tournamentTeamsModel.findByIdAndDelete(id);
      if (!deleted) return res.status(404).send({ message: "Not found" });

      return res.status(200).send({ message: "Deleted" });
    } catch (error) {
      return res.status(500).send({ error: "Delete failed", details: error });
    }
  }

  public static async addTeam(req: any, res: any) {
    try {
      const id = req.params.id;
      const { teamId } = req.body;

      const tournament = await tournamentTeamsModel.findById(id);
      if (!tournament) return res.status(404).send({ message: "Not found" });
      const data: any = await tournamentTeamsModel.find({ tournamentId: id });
      if (!data)
        await tournamentTeamsModel.create({
          tournamentId: id,
          teamIds: [teamId],
        });
      else {
        if (!data.teamIds.includes(teamId)) {
          data.teamIds.push(teamId);
          await data.save();
        }
      }

      return res.status(200).send({ message: "Team added", data });
    } catch (error) {
      return res.status(500).send({ error: "Add team failed", details: error });
    }
  }

  public static async removeTeam(req: any, res: any) {
    try {
      const id = req.params.id;
      const { teamId } = req.body;

      const data = await tournamentTeamsModel.findById(id);
      if (!data) return res.status(404).send({ message: "Not found" });

      data.teamIds = data.teamIds.filter((tid: string) => tid !== teamId);
      await data.save();

      return res.status(200).send({ message: "Team removed", data });
    } catch (error) {
      return res
        .status(500)
        .send({ error: "Remove team failed", details: error });
    }
  }
}
