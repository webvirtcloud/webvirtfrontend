import { useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import tw from 'twin.macro';

import { Button } from '../Button';
import { Menu, MenuItem } from '../Menu';
import { Wrapper } from './styles';

export default function DistributionCard({
  distribution,
  isActive,
  onDistributionChange,
  onImageChange,
}) {
  const { control, watch } = useFormContext();
  const menu = useRef();
  const [isOpen, toggle] = useState(false);
  const img = watch('image');
  return (
    <div>
      <Controller
        render={() => (
          <Wrapper onClick={() => onDistributionChange(distribution)} isActive={isActive}>
            <div css={tw`flex items-center space-x-2`}>
              <img
                css={tw`w-8 h-8`}
                src={
                  new URL(
                    `/src/shared/assets/images/os/${distribution.slug}.svg`,
                    import.meta.url,
                  ).href
                }
                alt={`Logo of ${distribution.name}`}
              />
              <div css={tw`font-bold`}>{distribution.name}</div>
            </div>
            <div
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            >
              <Controller
                render={({ field }) => (
                  // <select {...field}  css={tw`bg-base rounded text-sm`}>
                  //   {distribution.images.map((image) => (
                  //     <option key={image.slug} value={image.slug}>
                  //       {image.name}
                  //     </option>
                  //   ))}
                  // </select>
                  <>
                    <Button
                      variant={isActive ? 'default' : 'secondary'}
                      ref={menu}
                      fullWidth
                      onClick={() => toggle((open) => !open)}
                    >
                      {isActive ? img.name : 'Select image...'}
                    </Button>
                    <Menu isOpen={isOpen} source={menu} onClose={() => toggle(false)}>
                      {distribution.images.map((image) => (
                        <MenuItem
                          key={image.slug}
                          onClick={() => {
                            onDistributionChange(distribution);
                            onImageChange(image);
                            toggle(false);
                          }}
                        >
                          {image.name}
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                )}
                control={control}
                name="image"
              />
            </div>
          </Wrapper>
        )}
        control={control}
        name="distribution"
      />
    </div>
  );
}
