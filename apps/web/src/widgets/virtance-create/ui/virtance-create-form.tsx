import { createVirtance } from '@/entities/virtance';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useToast } from 'ui/components/toast';
import { VirtanceCreateDistributions } from './virtance-create-distributions';
import { VirtanceCreateOverview } from './virtance-create-overview';
import { VirtanceCreateRegions } from './virtance-create-regions';
import { VirtanceCreateSettings } from './virtance-create-settings';
import { VirtanceCreateSizes } from './virtance-create-sizes';

export default function VirtanceCreateForm({
  defaultValues,
  distributions,
  sizes,
  regions,
}) {
  const navigate = useNavigate();
  const methods = useForm({ defaultValues });
  const { toast } = useToast();

  async function onSubmit(data) {
    try {
      await createVirtance({
        size: data.size.slug,
        image: data.image.slug,
        name: data.name,
        region: data.region.slug,
        ...(data.keypairs && data.keypairs.length > 0
          ? { keypairs: [...data.keypairs] }
          : {}),
        ...(data.password ? { password: data.password } : {}),
        ...(data.userdata ? { userdata: data.userdata } : {}),
      });

      navigate('/virtances');
    } catch (e) {
      const { errors } = await e.response.json();

      errors.forEach((error) => {
        const keys = Object.keys(error);

        keys.forEach((key) => {
          toast({ title: 'Form error', description: error[key] });
        });
      });
    }
  }

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="relative mx-auto max-w-4xl py-8 md:py-16"
        >
          <div className="md:col-span-5">
            <div className="mb-8">
              <h1 className="mb-2 text-2xl font-medium">
                Let&apos;s build a new server.
              </h1>
              <p className="text-neutral-500">
                Feel free to create server with any of provided options.
              </p>
            </div>

            <VirtanceCreateOverview />
            <VirtanceCreateDistributions distributions={distributions} />
            <VirtanceCreateRegions regions={regions} />
            <VirtanceCreateSizes sizes={sizes} />
            <VirtanceCreateSettings />
          </div>
        </form>
      </FormProvider>
    </>
  );
}
