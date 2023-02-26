import { FormProvider, useForm } from 'react-hook-form';
import tw from 'twin.macro';

import Overview from './overview';
import DistributionsSection from './sections/Distributions';
import RegionsSection from './sections/Regions';
import SettingsSection from './sections/Settings';
import SizesSecction from './sections/Sizes';

export default function CreateForm({
  defaultValues,
  onSubmit,
  distributions,
  sizes,
  regions,
}) {
  const methods = useForm({ defaultValues });

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          css={tw`relative max-w-4xl py-8 mx-auto md:py-16`}
        >
          <div css={tw`md:col-span-5`}>
            <div css={tw`mb-8`}>
              <h1 css={tw`mb-2 text-2xl font-bold`}>Let&apos;s build a new server.</h1>
              <p css={tw`text-alt2`}>
                Feel free to create server with any of provided options.
              </p>
            </div>

            <Overview />

            <RegionsSection regions={regions} />

            <DistributionsSection distributions={distributions} />

            <SizesSecction sizes={sizes} />

            <SettingsSection />
          </div>
        </form>
      </FormProvider>
    </>
  );
}
