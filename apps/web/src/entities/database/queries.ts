export const databaseQueries = {
  database: (id: string) => ['databases', id],
  event: (id: string) => ['database-event', id],
  list: () => ['databases'],
  dbms: () => ['dbms'],
};
