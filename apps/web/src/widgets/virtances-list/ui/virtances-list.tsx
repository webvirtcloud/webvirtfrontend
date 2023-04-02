import { useVirtances, VirtanceCard } from '@/entities/virtance';
import { State } from '@/shared/ui/state';
import { useNavigate } from 'react-router-dom';
import { Button } from 'ui/components/button';
import { Input } from 'ui/components/input';
import { VirtanceToggleStateButton } from '@/entities/virtance';

export function VirtancesList() {
  const navigate = useNavigate();
  const { virtances, runAction, error } = useVirtances();

  async function onToggleState({ id, action }) {
    runAction({ id, action });
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
                    <VirtanceToggleStateButton
                      onToggle={onToggleState}
                      id={virtance.id}
                      status={virtance.status}
                    />
                  }
                />
              }
            </li>
          ))}
        </ul>
      ) : null}

      {virtances && virtances.length === 0 && <div>No created servers.</div>}
    </section>
  );
}
