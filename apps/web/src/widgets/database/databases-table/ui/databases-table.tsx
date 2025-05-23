import { useQueries, useQueryClient } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { format } from 'date-fns';
import { EllipsisIcon } from 'lucide-react';
import { useMemo } from 'react';
import { toast } from 'sonner';
import { Button, buttonVariants } from 'ui/components/button';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'ui/components/dropdown-menu';
import { DropdownMenu } from 'ui/components/dropdown-menu';
import { Spin } from 'ui/components/spin';
import { StatusDot } from 'ui/components/status-dot';
import { Table } from 'ui/components/table';
import { cx } from 'ui/lib';

import {
  Database,
  databaseQueries,
  getDatabase,
  useDatabases,
} from '@/entities/database';
import { Event } from '@/entities/event';
import { REFRESH_INTERVAL } from '@/shared/constants';
import { formatMemorySize } from '@/shared/lib/number';
import { State } from '@/shared/ui/state';

export function DatabasesList() {
  const queryClient = useQueryClient();
  const { data: databases, error } = useDatabases();

  const events = useMemo(() => {
    const uniqueIds = new Set<string>();
    const uniqueEvents: { id: string; event: Event }[] = [];

    if (databases === undefined) return uniqueEvents;

    databases.forEach((database) => {
      if (database.event !== null && !uniqueIds.has(database.id)) {
        uniqueIds.add(database.id);
        uniqueEvents.push({ id: database.id, event: database.event });
      }
    });

    return uniqueEvents;
  }, [databases]);

  useQueries({
    queries: events.map((event) => ({
      queryKey: databaseQueries.event(event.id),
      queryFn: () => getDatabase(event.id),
      refetchInterval: (query) => {
        if (query.state.data && query.state.data.database.event === null) {
          queryClient.setQueryData<Database[]>(databaseQueries.list(), (previousData) => {
            if (previousData) {
              return previousData.map((database: Database) =>
                database.id === event.id ? query.state.data?.database : database,
              );
            }
          });

          toast.success(
            `The task ${event.event?.description.toLowerCase()} of database has been completed.`,
          );

          queryClient.removeQueries({ queryKey: databaseQueries.event(event.id) });

          return false;
        }
        return REFRESH_INTERVAL;
      },
    })),
  });

  const Actions = ({ value }) => (
    <div className="space-x-2">
      <div className="flex justify-end space-x-2">
        {value.event !== null ? (
          <Spin size="sm" className="mr-2.5" />
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="size-8">
                <EllipsisIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/databases/$uuid/backups" params={{ uuid: value.id }}>
                  Backups
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/databases/$uuid/settings" params={{ uuid: value.id }}>
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );

  const columns = useMemo(
    () => [
      {
        field: 'name',
        name: 'Name',
        component: ({ value }) => {
          return (
            <div className="flex items-center gap-2">
              <div className="bg-muted/50 relative flex h-10 w-10 shrink-0 items-center justify-center rounded">
                <img
                  className="h-5 w-5"
                  src={
                    new URL(
                      `/src/shared/assets/images/engines/${
                        value.engine.slug.split('-')[0]
                      }.svg`,
                      import.meta.url,
                    ).href
                  }
                  alt={`Logo of ${value.engine.name}`}
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <Link
                    className="text-highlight decoration-highlight/50 hover:decoration-highlight font-medium underline underline-offset-4"
                    to="/databases/$uuid"
                    params={{ uuid: value.id }}
                  >
                    {value.name}
                  </Link>
                  <StatusDot status={value.event ? 'pending' : 'active'} />
                </div>
                <p className="text-muted-foreground text-sm">
                  {formatMemorySize(value.size.memory)} DDR4 / {value.size.disk}GB SSD /{' '}
                  {value.region.name} /{' '}
                  <span className="text-foreground font-medium">{value.engine.name}</span>
                </p>
              </div>
            </div>
          );
        },
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
    ],
    [databases],
  );

  if (error) {
    return (
      <State
        title="Oh no..."
        description="We cannot display databases at this time for some reason."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Databases</h2>
          <p className="text-muted-foreground">
            Databases allow you to create and manage databases in the same datacenter.
          </p>
        </div>
        <Link to="/databases/create" className={cx(buttonVariants())}>
          Create Database
        </Link>
      </div>
      {databases ? (
        <>
          <Table data={databases} columns={columns} />
          {databases.length === 0 ? (
            <State
              title="No Databases"
              description="Add new Databases to start use them."
            />
          ) : null}
        </>
      ) : null}
    </div>
  );
}
