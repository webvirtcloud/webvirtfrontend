import { z } from 'zod';

import { DatabaseCreateFormSchema } from './schema';

export type DatabaseCreateForm = z.infer<typeof DatabaseCreateFormSchema>;
