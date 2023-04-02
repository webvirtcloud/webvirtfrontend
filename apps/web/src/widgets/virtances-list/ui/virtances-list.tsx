import { useVirtances, VirtanceCard, VirtanceRebootButton } from '@/entities/virtance';
import { State } from '@/shared/ui/state';
import { useNavigate } from 'react-router-dom';
import { Button } from 'ui/components/button';
import { Input } from 'ui/components/input';
import { VirtanceToggleStateButton } from '@/entities/virtance';
import { Skeleton } from 'ui/components/skeleton';

export function VirtancesList() {
  const navigate = useNavigate();
  const { virtances, runAction, error } = useVirtances();

  async function onRunAction(payload) {
    runAction(payload);
  }

  if (error) {
    return (
      <State
        title="Oh no..."
        description="We cannot display any virtance at this time for some reason."
      />
    );
  }
  return (
    <section>
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Input id="server-search" name="server-search" placeholder="Search..." />
        </div>
        <Button onClick={() => navigate('/virtances/create')}>New virtance</Button>
      </div>

      {virtances ? (
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {virtances.map((virtance) => (
            <li key={virtance.id}>
              {
                <VirtanceCard
                  to={`/virtances/${virtance.id}`}
                  virtance={virtance}
                  actions={
                    <>
                      <VirtanceToggleStateButton
                        onToggle={onRunAction}
                        id={virtance.id}
                        status={virtance.status}
                      />
                      <VirtanceRebootButton
                        onToggle={onRunAction}
                        id={virtance.id}
                        status={virtance.status}
                      />
                    </>
                  }
                />
              }
            </li>
          ))}
        </ul>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(6).keys()].map((i) => (
            <li key={i}>
              <Skeleton className="h-40 w-full" />
            </li>
          ))}
        </ul>
      )}

      {virtances && virtances.length === 0 && <div>No created servers.</div>}
    </section>
  );
}
