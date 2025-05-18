export const databaseQueries = {
  database: (id: string) => ['databases', id],
  event: (id: string) => ['database-event', id],
  list: () => ['databases'],
  dbms: () => ['dbms'],
  snapshots: (id: string) => ['snapshots', id],
  backups: (id: string) => ['backups', id],
};
