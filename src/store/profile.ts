import { atom } from 'jotai';

import type { Profile } from '@/api/account';

export const store = atom<undefined | Profile>(undefined);
