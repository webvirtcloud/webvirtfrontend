import { allDocs, type Doc } from 'contentlayer/generated';

export function useDocsNavigation() {
  const docsBySection = allDocs
    .sort((a, b) => a.index - b.index)
    .reduce((acc, doc) => {
      const section = doc.section;
      acc[section] = acc[section] || [];
      acc[section].push(doc);
      return acc;
    }, {} as Record<string, Doc[]>);

  const sortedSections = Object.entries(docsBySection).sort(
    (a, b) => a[1][0].index - b[1][0].index,
  );

  const sortedDocsBySection: Record<string, Doc[]> = {};
  sortedSections.forEach(([key, value]) => {
    sortedDocsBySection[key] = value;
  });

  return {
    navigation: sortedDocsBySection,
  };
}
