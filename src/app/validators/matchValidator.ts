import { z } from "zod";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const createMatchValidator = z.object({
  name: z.string().min(3),
  tournament: z.string(),
  ground: z.string(),
  teamA: z.string(),
  teamB: z.string(),
  date: z.coerce.date().refine((date) => date >= today, {
    message: "Start date must be today or later",
  }),
  status: z.enum(["scheduled", "live", "completed", "cancelled"]),
});
