import ShieldCheckIcon from '@heroicons/react/20/solid/ShieldCheckIcon';
import { Link } from '@tanstack/react-router';
import { buttonVariants } from 'ui/components/button';
import { cx } from 'ui/lib';

import { calculateType } from '@/entities/firewall';
import { useVirtanceFirewall } from '@/entities/virtance';

export function VirtanceFirewall({ id }: { id: number }) {
  const { data, error } = useVirtanceFirewall(id);
  const firewall = data?.[0];

  if (error) {
    return <div className="text-muted-foreground">Error while fetching Firewall</div>;
  }
  return (
    <div className="border-t pt-8">
      <h2 className="mb-4 text-lg font-medium">Firewall</h2>
      {firewall ? (
        <div className="space-y-8">
          <Link
            to="/firewalls/$uuid"
            params={{ uuid: firewall.uuid }}
            className={cx(buttonVariants({ variant: 'outline' }), 'min-w-32')}
          >
            <ShieldCheckIcon className="mr-1 h-4 w-4" />
            {firewall.name}
          </Link>

          <div>
            <h2 className="mb-4 text-lg font-medium">Inbound rules</h2>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-muted-foreground bg-muted whitespace-nowrap px-4 py-2.5 text-left text-xs first:rounded-tl-md">
                    Type
                  </th>
                  <th className="text-muted-foreground bg-muted whitespace-nowrap px-4 py-2.5 text-left text-xs">
                    Protocol
                  </th>
                  <th className="text-muted-foreground bg-muted whitespace-nowrap px-4 py-2.5 text-left text-xs">
                    Port range
                  </th>
                  <th className="text-muted-foreground bg-muted whitespace-nowrap px-4 py-2.5 text-left text-xs">
                    Sources
                  </th>
                  <th className="text-muted-foreground bg-muted whitespace-nowrap px-4 py-2.5 text-left text-xs last:rounded-tr-md"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {firewall.inbound_rules.map((rule) => (
                  <tr key={'inbound' + rule.ports + rule.protocol}>
                    <td className="px-4 py-2.5">{calculateType(rule)}</td>
                    <td className="px-4 py-2.5">{rule.protocol.toUpperCase()}</td>
                    <td className="px-4 py-2.5">{rule.ports}</td>
                    <td className="px-4 py-2.5">
                      <ul className="flex flex-wrap items-start gap-1">
                        {rule.sources.addresses.map((address) => (
                          <li key={address} className="bg-muted rounded px-2">
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
                  <th className="text-muted-foreground bg-muted whitespace-nowrap px-4 py-2.5 text-left text-xs first:rounded-tl-md">
                    Type
                  </th>
                  <th className="text-muted-foreground bg-muted whitespace-nowrap px-4 py-2.5 text-left text-xs">
                    Protocol
                  </th>
                  <th className="text-muted-foreground bg-muted whitespace-nowrap px-4 py-2.5 text-left text-xs">
                    Port range
                  </th>
                  <th className="text-muted-foreground bg-muted whitespace-nowrap px-4 py-2.5 text-left text-xs">
                    Sources
                  </th>
                  <th className="text-muted-foreground bg-muted whitespace-nowrap px-4 py-2.5 text-left text-xs last:rounded-tr-md"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {firewall.outbound_rules.map((rule) => (
                  <tr key={'inbound' + rule.ports + rule.protocol}>
                    <td className="px-4 py-2.5">{calculateType(rule)}</td>
                    <td className="px-4 py-2.5">{rule.protocol.toUpperCase()}</td>
                    <td className="px-4 py-2.5">{rule.ports}</td>
                    <td className="px-4 py-2.5">
                      <ul className="flex flex-wrap items-start gap-1">
                        {rule.destinations.addresses.map((address) => (
                          <li key={address} className="bg-muted rounded px-2">
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
          <p className="text-muted-foreground">No Firewalls applied to this Virtance</p>
        </div>
      )}
    </div>
  );
}
