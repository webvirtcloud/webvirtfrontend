import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useToast } from 'ui/components/toast';

import { Region } from '@/entities/region';
import { Size } from '@/entities/size';
import { createVirtance } from '@/entities/virtance';

import { type CreateVirtanceForm, schema } from '../types';
import { VirtanceCreateImages } from './virtance-create-images';
import { VirtanceCreateOverview } from './virtance-create-overview';
import { VirtanceCreateRegions } from './virtance-create-regions';
import { VirtanceCreateSettings } from './virtance-create-settings';
import { VirtanceCreateSizes } from './virtance-create-sizes';

export default function VirtanceCreateForm({
  defaultValues,
  sizes,
  regions,
}: {
  defaultValues: CreateVirtanceForm;
  sizes: Size[];
  regions: Region[];
}) {
  const navigate = useNavigate();
  const form = useForm<CreateVirtanceForm>({
    defaultValues,
    resolver: zodResolver(schema),
  });
  const { toast } = useToast();

  const { slug: currentSizeSlug } = form.watch('size');
  const currentImage = form.watch('image');
  const currentRegion = form.watch('region');

  const filteredSizes = useMemo(
    () =>
      sizes
        .filter((size) => size.regions.includes(currentRegion.slug))
        .map((size) => ({
          ...size,
          available: size.available && size.disk > currentImage.minDiskSize,
        })),
    [sizes, currentImage],
  );

  useEffect(() => {
    const currentSize = filteredSizes.find((size) => size.slug === currentSizeSlug);
    const nextAvailableSize = filteredSizes.find((size) => size.available);
    const isSizeChanged = form.getFieldState('size').isDirty;

    if (nextAvailableSize && !(currentSize?.available && isSizeChanged)) {
      form.setValue('size', {
        slug: nextAvailableSize.slug,
        price_monthly: nextAvailableSize.price_monthly,
        disk: nextAvailableSize.disk,
        memory: nextAvailableSize.memory,
      });
    }
  }, [filteredSizes]);

  async function onSubmit(data: CreateVirtanceForm) {
    try {
      await createVirtance({
        name: data.name,
        size: data.size.slug,
        image: data.image.id,
        region: data.region.slug,
        backups: data.backups,
        ...(data.authentication?.keys && data.authentication.keys.size > 0
          ? { keypairs: [...data.authentication.keys.values()] }
          : {}),
        ...(data.authentication.password
          ? { password: data.authentication.password }
          : {}),
        ...(data.userdata ? { userdata: data.userdata } : {}),
      });
      navigate('/');
    } catch (e) {
      const { errors, message, status_code } = await e.response.json();

      if (status_code === 500 && message) {
        return toast({ title: '500', description: message });
      }

      if (status_code === 400 && errors) {
        return errors.forEach((error) => {
          const keys = Object.keys(error);

          keys.forEach((key) => {
            toast({ title: 'Form error', description: error[key] });
          });
        });
      }
    }
  }

  return (
    <>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative mx-auto max-w-4xl py-8"
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

            <VirtanceCreateRegions regions={regions} />
            <VirtanceCreateImages />
            <VirtanceCreateSizes sizes={filteredSizes} />
            <VirtanceCreateSettings />
            <VirtanceCreateOverview />
          </div>
        </form>
      </FormProvider>
    </>
  );
}
