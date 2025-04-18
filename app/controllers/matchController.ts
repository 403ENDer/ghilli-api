import { matchModel } from "../model/matchModel";
import { createMatchValidator } from "../validators/matchValidator";

export class MatchController {
  public static async getMatch(req: any, res: any) {
    try {
      const matchId = req.params.id;
      const match = await matchModel
        .findById(matchId)
        .populate("teamA")
        .populate("teamB")
        .populate("tournament");
      if (!match) return res.status(404).send({ message: "Match not found" });
      return res.status(200).send({ data: match });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({ error: "Failed to get match", details: error });
    }
  }

  public static async getMatchsByTournament(req: any, res: any) {
    try {
      const tournamentId = req.params.id;
      const matchs = await matchModel.find({ tournamentId: tournamentId });
      return res.status(200).send({ data: matchs });
    } catch (error) {
      return res
        .status(500)
        .send({ error: "Failed to get matchs", details: error });
    }
  }
  public static async getAllMatches(req: any, res: any) {
    try {
      const matches = await matchModel.find();
      return res.status(200).send({ data: matches });
    } catch (error) {
      return res
        .status(500)
        .send({ error: "Failed to fetch matches", details: error });
    }
  }

  public static async createMatch(req: any, res: any) {
    try {
      const data = createMatchValidator.safeParse(req.body).data;
      const match = new matchModel(data);
      await match.save();
      return res.status(201).send({ message: "Match created", data: match });
    } catch (error) {
      return res
        .status(500)
        .send({ error: "Failed to create match", details: error });
    }
  }

  public static async updateMatch(req: any, res: any) {
    try {
      const matchId = req.params.matchId;
      const updateData = req.body;
      const updatedMatch = await matchModel.findByIdAndUpdate(
        matchId,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!updatedMatch)
        return res.status(404).send({ message: "Match not found" });
      return res
        .status(200)
        .send({ message: "Match updated", data: updatedMatch });
    } catch (error) {
      return res
        .status(500)
        .send({ error: "Failed to update match", details: error });
    }
  }

  public static async deleteMatch(req: any, res: any) {
    try {
      const matchId = req.params.matchId;
      const deletedMatch = await matchModel.findByIdAndDelete(matchId);
      if (!deletedMatch)
        return res.status(404).send({ message: "Match not found" });
      return res.status(200).send({ message: "Match deleted" });
    } catch (error) {
      return res
        .status(500)
        .send({ error: "Failed to delete match", details: error });
    }
  }
}
