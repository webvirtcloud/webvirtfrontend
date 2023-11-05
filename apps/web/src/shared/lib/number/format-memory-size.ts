// temporary solution due to API limitations
export function formatMemorySize(num: number) {
  return String(num).length > 3 ? `${num / 1024}GB` : `${num}MB`;
}
