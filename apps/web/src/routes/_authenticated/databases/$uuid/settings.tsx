import { createFileRoute } from '@tanstack/react-router';

import { DatabaseSettings } from '@/widgets/database';

export const Route = createFileRoute('/_authenticated/databases/$uuid/settings')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <DatabaseSettings />
    </div>
  );
}
