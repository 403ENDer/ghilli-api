import { matchModel } from "../model/matchModel";
import { PlayerModel } from "../model/playerModel";
import { playerStatsModel } from "../model/playerStatsModel";
import { teamModel } from "../model/teamModel";
import { tournamentModel } from "../model/tournamentModel";
import { createPlayerValidator } from "../validators/playerValidator";

export class PlayerController {
  public static async getAllPlayers(req: any, res: any) {
    try {
      const players = await PlayerModel.find();
      return res.status(200).send({ data: players });
    } catch (error) {
      return res.status(500).send({ error });
    }
  }

  public static async getPlayerTeams(req: any, res: any) {
    try {
      const playerId = req.query.id;
      const teams = await teamModel.find({ players: playerId });
      return res.status(200).send({ data: teams });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ error: err });
    }
  }

  public static async getPlayerMatches(req: any, res: any) {
    try {
      const playerId = req.query.id;
      const teams = await teamModel.find({ players: playerId }).select("_id");
      const teamIds = teams.map((team) => team._id);

      if (teamIds.length === 0) return [];

      const matches = await matchModel
        .find({
          $or: [{ teamA: { $in: teamIds } }, { teamB: { $in: teamIds } }],
        })
        .populate([
          { path: "tournament", select: "name" },
          { path: "teamA", select: "name location" },
          { path: "teamB", select: "name location" },
          { path: "wonBy", select: "name" },
        ]);
      return res.status(200).send({ data: matches });
    } catch (err) {
      return res.status(500).send({ error: err });
    }
  }

  public static async getPlayerTournaments(req: any, res: any) {
    try {
      const playerId = req.query.id;
      const teams = await teamModel.find({ players: playerId }).select("_id");
      const teamIds = teams.map((team) => team._id);

      if (teamIds.length === 0) return [];

      const matches = await matchModel
        .find({
          $or: [{ teamA: { $in: teamIds } }, { teamB: { $in: teamIds } }],
        })
        .select("tournament");

      const tournamentIds = [
        ...new Set(matches.map((match) => match.tournament.toString())),
      ];

      if (tournamentIds.length === 0) return [];

      const tournaments = await tournamentModel.find({
        _id: { $in: tournamentIds },
      });

      return res.status(200).send({ data: tournaments });
    } catch (err) {
      return res.status(500).send({ error: err });
    }
  }

  public static async getPlayerStat(req: any, res: any) {
    try {
      const playerId = req.query.id;
      console.log(playerId);
      const playerStat = await playerStatsModel.find({ playerId: playerId });
      return res.status(200).send({ data: playerStat });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ error: err });
    }
  }

  public static async getPlayerById(req: any, res: any) {
    try {
      const { id } = req.params;
      const player = await PlayerModel.findById(id);
      if (!player) {
        return res.status(404).send({ message: "Player not found" });
      }
      return res.status(200).send({ data: player });
    } catch (error) {
      return res.status(500).send({ error });
    }
  }

  public static async createPlayer(req: any, res: any) {
    try {
      const data = createPlayerValidator.safeParse(req.body).data;
      const player = await PlayerModel.create(data);
      await playerStatsModel.create({ playerId: player._id });

      return res.status(201).send({ data: player });
    } catch (error) {
      return res.status(500).send({ error });
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
        return res.status(404).send({ message: "Player not found" });
      }
      return res.status(200).send({ data: updated });
    } catch (error) {
      return res.status(500).send({ error });
    }
  }

  public static async deletePlayer(req: any, res: any) {
    try {
      const { id } = req.params;
      const deleted = await PlayerModel.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).send({ message: "Player not found" });
      }
      return res.status(200).send({ message: "Player deleted" });
    } catch (error) {
      return res.status(500).send({ error });
    }
  }
}
