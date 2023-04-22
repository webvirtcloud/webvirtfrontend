import useSWR, { SWRConfiguration } from 'swr';
import { getSizes } from '../api';
import { Size } from '../types';

export function useSizes(options?: SWRConfiguration<Size[]>) {
  return useSWR<Size[]>(
    ['sizes'],
    () => getSizes().then((response) => response.sizes),
    options,
  );
}
