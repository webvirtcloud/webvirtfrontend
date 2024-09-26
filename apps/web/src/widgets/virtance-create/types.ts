import { z } from 'zod';

import { type Distribution } from '@/entities/image';

export const schema = z.object({
  distribution: z.string().optional(),
  image: z.object(
    {
      id: z.string().or(z.number()),
      type: z.enum(['distribution', 'snapshot', 'backup']),
      minDiskSize: z.number(),
      description: z.string(),
      name: z.string(),
    },
    { required_error: 'Please select image.' },
  ),
  size: z.object(
    {
      slug: z.string(),
      price_monthly: z.number(),
      memory: z.number(),
      disk: z.number(),
    },
    { required_error: 'Please select size.' },
  ),
  region: z.object({
    slug: z.string({ required_error: 'Please select region.' }),
    name: z.string(),
    features: z.array(
      z.union([
        z.literal('backup'),
        z.literal('snapshot'),
        z.literal('ipv6'),
        z.literal('resize'),
        z.literal('volume'),
        z.literal('one_click'),
        z.literal('floating_ip'),
        z.literal('load_balancer'),
      ]),
    ),
  }),
  authentication: z.object({
    method: z.enum(['ssh', 'password'] as const, {
      required_error: 'Please select an authentication method',
    }),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .max(24, 'Password can be maximum 24 characters')
      .optional(),
    keys: z.set(z.number()).min(1, 'Min 1 keypair should be selected').optional(),
  }),
  userdata: z.string().optional(),
  backups: z.boolean().default(false),
  name: z.string().min(1, { message: 'Please enter virtance name.' }),
});

export type CreateVirtanceForm = z.infer<typeof schema>;

export interface FormDistribution {
  name: string;
  slug: string;
  images: Distribution[];
}
