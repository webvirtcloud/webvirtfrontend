import { type ReactNode, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'ui/components/dialog';
import { createKeypair, type KeypairPayload, type Keypair } from '@/entities/keypair';
import { KeypairForm } from '@/entities/keypair/ui/keypair-form';
import { FormProvider, useForm } from 'react-hook-form';

interface Props {
  children: ReactNode;
  onCreate: (keypair: Keypair) => void;
}

export function KeypairCreateDialog({ onCreate, children }: Props) {
  const methods = useForm();
  const [dialogOpen, setDialogOpen] = useState(false);

  async function onSubmit(payload: KeypairPayload) {
    try {
      const { keypair } = await createKeypair(payload);

      onCreate(keypair);

      setDialogOpen(false);
    } catch (e) {
      const { errors } = await e.response.json();
      errors.forEach((error) => {
        const keys = Object.keys(error);

        keys.forEach((key: keyof KeypairPayload) => {
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
          <DialogTitle>New keypair</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <KeypairForm onSubmit={onSubmit} />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
