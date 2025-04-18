import { z } from "zod";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const createTournamentValidator = z
  .object({
    name: z.string().min(3),
    location: z.string().min(3),
    startDate: z.coerce.date().refine((date) => date >= today, {
      message: "Start date must be today or later",
    }),
    endDate: z.coerce.date(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });
