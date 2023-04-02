/**
 * Formats a given number of bytes into a human-readable file size.
 *
 * @param {number} bytes - The number of bytes to format.
 * @param {number} [decimals=2] - The number of decimal places to include in the output.
 * @returns {string} A string representing the formatted file size.
 */
export function formatFileSize(size: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const unitIndex = Math.floor(Math.log(size) / Math.log(1024));
  const unit = units[unitIndex];
  return `${size / Math.pow(1024, unitIndex)} ${unit}`;
}
