import { atom } from 'jotai';

import { User } from './types';

export const useUserStore = atom<undefined | User>(undefined);
