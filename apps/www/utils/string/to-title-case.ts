export function toTitleCase(input: string) {
  return input
    .toLowerCase()
    .replace(/(?:^|\s|-)\w/g, function (match) {
      return match.toUpperCase();
    })
    .replaceAll('-', ' ');
}
