import { calculateType, getFirewalls } from '@/entities/firewall';
import { useNavigate } from 'react-router-dom';
import { Button } from 'ui/components/button';
import useSWR from 'swr';
import ShieldCheckIcon from '@heroicons/react/20/solid/ShieldCheckIcon';

export function VirtanceFirewall({ id }: { id: number }) {
  const navigate = useNavigate();
  const { data, error } = useSWR('virtance-firewall', () =>
    getFirewalls({ virtance_id: Number(id) }).then((data) => data.firewalls),
  );

  const firewall = data?.[0];

  if (error) {
    return <div className="text-neutral-500">Error while fetching Firewall</div>;
  }
  return (
    <div className="border-t border-zinc-800 pt-8">
      <h2 className="mb-4 text-lg font-medium">Firewall</h2>
      {firewall ? (
        <div className="space-y-8">
          <Button
            onClick={() => navigate(`/firewalls/${firewall.uuid}`)}
            variant="secondary"
          >
            <ShieldCheckIcon className="mr-2 h-4 w-4" />
            {firewall.name}
          </Button>

          <div>
            <h2 className="mb-4 text-lg font-medium">Inbound rules</h2>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="whitespace-nowrap bg-zinc-100 px-4 py-2.5 text-left text-xs text-neutral-500 first:rounded-tl-md dark:bg-zinc-800">
                    Type
                  </th>
                  <th className="whitespace-nowrap bg-zinc-100 px-4 py-2.5 text-left text-xs text-neutral-500 dark:bg-zinc-800">
                    Protocol
                  </th>
                  <th className="whitespace-nowrap bg-zinc-100 px-4 py-2.5 text-left text-xs text-neutral-500 dark:bg-zinc-800">
                    Port range
                  </th>
                  <th className="whitespace-nowrap bg-zinc-100 px-4 py-2.5 text-left text-xs text-neutral-500 dark:bg-zinc-800">
                    Sources
                  </th>
                  <th className="whitespace-nowrap bg-zinc-100 px-4 py-2.5 text-left text-xs text-neutral-500 last:rounded-tr-md dark:bg-zinc-800"></th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-neutral-700">
                {firewall.inbound_rules.map((rule) => (
                  <tr key={'inbound' + rule.ports + rule.protocol}>
                    <td className="px-4 py-2.5">{calculateType(rule)}</td>
                    <td className="px-4 py-2.5">{rule.protocol.toUpperCase()}</td>
                    <td className="px-4 py-2.5">{rule.ports}</td>
                    <td className="px-4 py-2.5">
                      <ul className="flex flex-wrap items-start gap-1">
                        {rule.sources.addresses.map((address) => (
                          <li
                            key={address}
                            className="rounded bg-zinc-100 px-2 dark:bg-zinc-700"
                          >
                            {address}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-medium">Outbound rules</h2>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="whitespace-nowrap bg-zinc-100 px-4 py-2.5 text-left text-xs text-neutral-500 first:rounded-tl-md dark:bg-zinc-800">
                    Type
                  </th>
                  <th className="whitespace-nowrap bg-zinc-100 px-4 py-2.5 text-left text-xs text-neutral-500 dark:bg-zinc-800">
                    Protocol
                  </th>
                  <th className="whitespace-nowrap bg-zinc-100 px-4 py-2.5 text-left text-xs text-neutral-500 dark:bg-zinc-800">
                    Port range
                  </th>
                  <th className="whitespace-nowrap bg-zinc-100 px-4 py-2.5 text-left text-xs text-neutral-500 dark:bg-zinc-800">
                    Sources
                  </th>
                  <th className="whitespace-nowrap bg-zinc-100 px-4 py-2.5 text-left text-xs text-neutral-500 last:rounded-tr-md dark:bg-zinc-800"></th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-neutral-700">
                {firewall.outbound_rules.map((rule) => (
                  <tr key={'inbound' + rule.ports + rule.protocol}>
                    <td className="px-4 py-2.5">{calculateType(rule)}</td>
                    <td className="px-4 py-2.5">{rule.protocol.toUpperCase()}</td>
                    <td className="px-4 py-2.5">{rule.ports}</td>
                    <td className="px-4 py-2.5">
                      <ul className="flex flex-wrap items-start gap-1">
                        {rule.destinations.addresses.map((address) => (
                          <li
                            key={address}
                            className="rounded bg-zinc-100 px-2 dark:bg-zinc-700"
                          >
                            {address}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-neutral-500">No Firewalls applied to this Virtance</p>
        </div>
      )}
    </div>
  );
}
