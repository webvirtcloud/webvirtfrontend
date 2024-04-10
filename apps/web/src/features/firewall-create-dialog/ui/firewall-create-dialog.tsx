import { type ReactNode, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'ui/components/dialog';

import { type Firewall, type FirewallPayload, createFirewall } from '@/entities/firewall';
import { CreateFirewallForm } from '@/features/create-firewall-form';

interface Props {
  children: ReactNode;
  onCreate: (keypair: Firewall) => void;
}

export function FirewallCreateDialog({ onCreate, children }: Props) {
  const methods = useForm();
  const [dialogOpen, setDialogOpen] = useState(false);

  async function onSubmit(payload: FirewallPayload) {
    try {
      const { firewall } = await createFirewall(payload);

      onCreate(firewall);

      setDialogOpen(false);
    } catch (e) {
      const { errors } = await e.response.json();
      errors.forEach((error) => {
        const keys = Object.keys(error);

        keys.forEach((key: keyof FirewallPayload) => {
          methods.setError(key, { message: error[key] });
        });
      });
    }
  }

  function onOpenChange(value: boolean) {
    setDialogOpen(value);
    methods.reset();
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={(value) => onOpenChange(value)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New firewall</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <CreateFirewallForm onSubmit={onSubmit} />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
