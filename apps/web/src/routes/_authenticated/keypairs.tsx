import { createFileRoute } from '@tanstack/react-router';

import { KeypairsTable } from '@/widgets/keypair';

export const Route = createFileRoute('/_authenticated/keypairs')({
  component: RouteComponent,
});

function RouteComponent() {
  return <KeypairsTable />;
}
