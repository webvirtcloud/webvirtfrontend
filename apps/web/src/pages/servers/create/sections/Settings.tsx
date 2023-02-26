import { useFormContext } from 'react-hook-form';
import tw from 'twin.macro';

import Input from '@/shared/ui/Input';

export default function Settings() {
  const { register } = useFormContext();
  return (
    <section>
      <h2 css={tw`mb-4 text-lg font-bold`}>Settings</h2>
      <Input
        required
        id="name"
        label="Name"
        placeholder="Enter name for server"
        size="lg"
        {...register('name', { required: 'Server name is required.' })}
      />
    </section>
  );
}
