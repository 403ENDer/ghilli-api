import { z } from 'zod';

export const createGroundValidator = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(10).max(10).optional(),
});
