import { type ComponentPropsWithoutRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from 'ui/components/dialog';
import {
  type Keypair,
  type KeypairPayload,
  updateKeypair,
  KeypairForm,
} from '@/entities/keypair';
import { FormProvider, useForm } from 'react-hook-form';

interface Props
  extends Pick<ComponentPropsWithoutRef<typeof Dialog>, 'open' | 'onOpenChange'> {
  onUpdate: (payload: KeypairPayload) => void;
  keypair: Keypair;
}

export function KeypairEditDialog({ onOpenChange, open, keypair, onUpdate }: Props) {
  const methods = useForm({
    defaultValues: { name: keypair.name, public_key: keypair.public_key },
  });

  async function handleSubmit(payload: KeypairPayload) {
    try {
      const response = await updateKeypair(keypair.id, payload.name);

      onUpdate(response.keypair);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit keypair</DialogTitle>
          <DialogDescription>You cannot update current public key.</DialogDescription>
        </DialogHeader>
        <FormProvider {...methods}>
          <KeypairForm keypair={keypair} onSubmit={handleSubmit} />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
