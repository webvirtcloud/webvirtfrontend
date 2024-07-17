import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Button, buttonVariants } from 'ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'ui/components/dropdown-menu';
import { Table } from 'ui/components/table';

import { useLoadbalancers } from '@/entities/loadbalancer';
import { State } from '@/shared/ui/state';

export function LoadbalancersTable() {
  const { data: loadbalancers, error } = useLoadbalancers();

  const Actions = ({ value }) => (
    <div className="space-x-2">
      <div className="flex justify-end space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">More</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to={`${value.id}/virtances`}>Virtances</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`${value.id}/settings`}>Settings</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  const columns = [
    {
      field: 'name',
      name: 'Name',
      component: ({ value }) => (
        <Link className="font-medium" to={`/loadbalancers/${value.id}`}>
          {value.name}
        </Link>
      ),
    },
    {
      field: 'ip',
      name: 'IP Address',
      formatter: (item) => item.ip ?? 'N/A',
    },
    {
      field: 'region',
      name: 'Region',
      formatter: (item) => item.region.name,
    },
    {
      field: 'created_at',
      name: 'Added on',
      formatter: (item) => format(new Date(item.created_at), 'MMM dd, yyyy'),
    },
    {
      field: 'actions',
      name: '',
      component: Actions,
    },
  ];

  if (error) {
    return (
      <State
        title="Oh no..."
        description="We cannot display any load balancer at this time for some reason."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-lg font-medium">Load Balancers</h2>

        <Link className={buttonVariants()} to="/loadbalancers/create">
          Add Load Balancer
        </Link>
      </div>

      {loadbalancers ? (
        <>
          <Table data={loadbalancers} columns={columns} />
          {loadbalancers.length === 0 ? (
            <State
              title="No Load balancers"
              description="Add new load balancer to start use them."
            />
          ) : null}
        </>
      ) : null}
    </div>
  );
}
