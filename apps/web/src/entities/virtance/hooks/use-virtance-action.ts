import { useQueryClient } from '@tanstack/react-query';

import { type ActionType, runVirtanceAction, virtanceQueries } from '@/entities/virtance';

export function useVirtanceAction() {
  const queryClient = useQueryClient();

  async function runAction(payload: ActionType) {
    await runVirtanceAction(payload);

    await queryClient.invalidateQueries({ queryKey: virtanceQueries.one(payload.id) });
  }

  return { runAction };
}
