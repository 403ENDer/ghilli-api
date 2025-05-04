import { string, z } from 'zod';

export const createGroundValidator = z.object({
  name: z.string().min(3),
  locationUrl: z.string().url(),
  // admin: z.string(),
});
