import { useQueryClient } from '@tanstack/react-query';

import { type ActionType, databaseQueries, runDatabaseAction } from '@/entities/database';

export function useDatabaseAction() {
  const queryClient = useQueryClient();

  async function runAction(payload: ActionType) {
    await runDatabaseAction(payload);

    await queryClient.invalidateQueries({
      queryKey: databaseQueries.database(payload.uuid),
    });
  }

  return { runAction };
}
