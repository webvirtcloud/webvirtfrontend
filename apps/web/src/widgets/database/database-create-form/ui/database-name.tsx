import { useFormContext } from 'react-hook-form';
import { Input } from 'ui/components/input';
import { Label } from 'ui/components/label';

import { type DatabaseCreateForm } from '../types';

export function DatabaseName() {
  const form = useFormContext<DatabaseCreateForm>();

  return (
    <div className="grid gap-2 md:max-w-64">
      <Label htmlFor="name" className="text-lg font-semibold">
        Name
      </Label>
      <Input id="name" {...form.register('name')} placeholder="my-database" />
    </div>
  );
}
