import { z } from 'zod';

export const DatabaseCreateFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  region: z.string().min(1, 'Region is required'),
  engine: z.string().min(1, 'Engine is required'),
  version: z.string().min(1, 'Version is required'),
  size: z.string().min(1, 'Size is required'),
  backups_enabled: z.boolean().optional(),
});
