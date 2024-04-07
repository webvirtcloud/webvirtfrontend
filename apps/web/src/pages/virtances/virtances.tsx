import { Button } from 'ui/components/button';

import { VirtancesList } from '@/widgets/virtances-list';

export default function Virtances() {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex gap-2">
          <Button size="sm">Default</Button>
          <Button size="sm" variant="outline">
            Outline
          </Button>
          <Button size="sm" variant="destructive">
            Destructive
          </Button>
        </div>
        <div className="flex gap-2">
          <Button disabled size="sm">
            Default
          </Button>
          <Button disabled size="sm" variant="outline">
            Outline
          </Button>
          <Button disabled size="sm" variant="destructive">
            Destructive
          </Button>
        </div>
      </div>
      <VirtancesList />
    </div>
  );
}
