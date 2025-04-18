import { string, z } from "zod";

export const createPlayerValidator = z.object({
  name: z.string().min(3),
  phone: string().min(10),
  email: z.string().email(),
});
