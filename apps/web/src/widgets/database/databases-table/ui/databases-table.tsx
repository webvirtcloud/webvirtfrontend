import { Link } from 'react-router-dom';
import { buttonVariants } from 'ui/components/button';
import { Table } from 'ui/components/table';
import { cx } from 'ui/lib';

import { useDatabases } from '@/entities/database';
import { State } from '@/shared/ui/state';

export function DatabasesList() {
  const { data: databases } = useDatabases();

  const columns = [
    {
      field: 'name',
      name: 'Name',
      component: ({ value }) => {
        return <div className="font-medium">{value.name}</div>;
      },
    },
  ];

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
