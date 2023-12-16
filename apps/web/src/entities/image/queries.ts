export const imageQueries = {
  list: (type: 'distribution' | 'snapshot' | 'backup') => ['images', { type }],
  snapshots: {
    list: () => ['images-snapshots'],
  },
};
