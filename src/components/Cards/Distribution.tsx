import { forwardRef } from 'react';
import tw, { styled } from 'twin.macro';

import type { Image } from '@/api/images';

interface Props {
  distribution: { name: string; slug: string; images: Image[] };
  isActive: boolean;
}

const Label = styled.label(({ isActive }: { isActive: boolean }) => [
  tw`block w-full p-4 cursor-pointer space-x-2 border rounded-md bg-base`,
  isActive ? tw`border-blue-500 ring-1 ring-blue-500` : tw``,
]);

function ImageCard({ distribution, isActive, ...props }: Props, ref) {
  return (
    <li key={distribution.slug}>
      <Label isActive={isActive}>
        <input
          ref={ref}
          type="radio"
          value={distribution.slug}
          id={`distribution-${distribution.slug}`}
          {...props}
        />
        <span>{distribution.slug}</span>
        <select css={tw`bg-base`}>
          {distribution.images.map((image) => (
            <option key={image.slug} value={image.slug}>
              {image.name}
            </option>
          ))}
        </select>
      </Label>
    </li>
  );
}

export default forwardRef<HTMLDivElement, Props>(ImageCard);
