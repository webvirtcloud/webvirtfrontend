import { useFormContext } from 'react-hook-form';
import tw from 'twin.macro';

import { Button } from '@/components/Button';

export default function Overview() {
  const { watch } = useFormContext();

  const image = watch('image');
  const distribution = watch('distribution');
  const region = watch('region');
  const size = watch('size');

  return (
    <div
      css={tw`sticky top-[120px] left-0 right-0 flex items-center justify-between p-4 mb-16 border rounded-md shadow-lg bg-base`}
    >
      <div>
        <div css={tw`flex items-center space-x-2`}>
          <div css={tw`flex items-center justify-center w-12 h-12 rounded bg-alt`}>
            <img
              css={tw`w-8 h-8`}
              src={
                new URL(`/src/assets/images/os/${distribution.slug}.svg`, import.meta.url)
                  .href
              }
              alt={`Logo of Ubuntu`}
            />
          </div>
          <div css={tw`space-y-0.5`}>
            <h3 css={tw`font-bold`}>
              {distribution.name} {image.name}
            </h3>
            <p css={tw`text-sm text-alt2`}>
              {size.memory}GB DDR4 / {size.disk}GB SSD / {region.name}
            </p>
          </div>
        </div>
      </div>
      <div css={tw`flex items-center space-x-4`}>
        <div>
          <span css={tw`font-bold text-xl`}>${size.price_monthly}</span>
          <span css={tw`text-alt`}>/mo</span>
        </div>
        <Button size="lg" type="submit">
          Deploy server
        </Button>
      </div>
    </div>
  );
}
