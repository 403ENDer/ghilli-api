import { teamModel } from '../model/teamModel';
import { createTeamValidator } from '../validators/teamValidator';

export class TeamsController {
  public static async getAllTeams(req: any, res: any) {
    try {
      const teams = await teamModel.find();
      return res.status(200).send({ data: teams });
    } catch (error) {
      return res.status(500).send({ error: 'Failed to fetch teams', details: error });
    }
  }

  public static async getTeam(req: any, res: any) {
    try {
      const teamId = req.params.id;
      const team = await teamModel.findById(teamId);
      if (!team) return res.status(404).send({ message: 'Team not found' });
      return res.status(200).send({ data: team });
    } catch (error) {
      return res.status(500).send({ error: 'Failed to get team', details: error });
    }
  }

  public static async createTeam(req: any, res: any) {
    try {
      const data = createTeamValidator.safeParse(req.body);
      if (!data?.success) return res.status(400).send({ message: 'Invalid format', details: data.error });
      const team = await teamModel.create(data.data);

      return res.status(201).send({ message: 'Team created', data: team });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: 'Failed to create team', details: error });
    }
  }

  public static async updateTeam(req: any, res: any) {
    try {
      const teamId = req.params.teamId;
      const updateData = req.body;
      const updatedTeam = await teamModel.findByIdAndUpdate(teamId, updateData, {
        new: true,
        runValidators: true,
      });
      if (!updatedTeam) return res.status(404).send({ message: 'Team not found' });
      return res.status(200).send({ message: 'Team updated', data: updatedTeam });
    } catch (error) {
      return res.status(500).send({ error: 'Failed to update team', details: error });
    }
  }

  public static async deleteTeam(req: any, res: any) {
    try {
      const teamId = req.params.id;
      const deletedTeam = await teamModel.findByIdAndDelete(teamId);
      if (!deletedTeam) return res.status(404).send({ message: 'Team not found' });
      return res.status(200).send({ message: 'Team deleted' });
    } catch (error) {
      return res.status(500).send({ error: 'Failed to delete team', details: error });
    }
  }

  public static async addPlayersBulk(req: any, res: any) {
    try {
      const teamId = req.params.teamId;
      const { players } = req.body;

      const team = await teamModel.findById(teamId);
      if (!team) return res.status(404).send({ message: 'Team not found' });

      team.players.push(...players);
      await team.save();

      return res.status(200).send({ message: 'Players added', data: team });
    } catch (error) {
      return res.status(500).send({ error: 'Failed to add players', details: error });
    }
  }

  public static async addPlayerSingle(req: any, res: any) {
    try {
      const teamId = req.params.id;
      const { player } = req.body;

      const team = await teamModel.findById(teamId);
      if (!team) return res.status(404).send({ message: 'Team not found' });

      team.players.push(player);
      await team.save();

      return res.status(200).send({ message: 'Player added', data: team });
    } catch (error) {
      return res.status(500).send({ error: 'Failed to add player', details: error });
    }
  }

  public static async removePlayer(req: any, res: any) {
    try {
      const teamId = req.params.teamId;
      const { playerId } = req.body;

      const team = await teamModel.findById(teamId);
      if (!team) return res.status(404).send({ message: 'Team not found' });

      team.players = team.players.filter((p: any) => p._id.toString() !== playerId);
      await team.save();

      return res.status(200).send({ message: 'Player removed', data: team });
    } catch (error) {
      return res.status(500).send({ error: 'Failed to remove player', details: error });
    }
  }
}
