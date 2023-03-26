import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class names together and returns a single class name.
 * @param {ClassValue[]} inputs - An array of class values to be merged together.
 * @returns {string} A single class name.
 */
export function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
