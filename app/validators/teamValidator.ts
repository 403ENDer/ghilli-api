import { z } from "zod";

export const createTeamValidator = z
  .object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    location: z
      .string()
      .min(3, { message: "Location must be at least 3 characters" }),
    ownerId: z.string(),
    players: z.array(z.string()).optional(),
  })
  .transform((data) => {
    if (!data.players || data.players.length === 0) {
      return { ...data, players: [data.ownerId] };
    }
    if (!data.players.includes(data.ownerId)) {
      return { ...data, players: [...data.players, data.ownerId] };
    }
    return data;
  });
