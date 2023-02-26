import tw from 'twin.macro';

import { Card } from '@/shared/ui/card';

import { Size } from '../types';

interface Props {
  isActive: boolean;
  onClick: () => void;
  size: Size;
}

export function SizeCard({ size, isActive, onClick }: Props) {
  return (
    <Card isActive={isActive} onClick={onClick}>
      <div css={tw`flex gap-8`}>
        <div css={tw`flex flex-col w-24 items-center justify-center border-r`}>
          <div css={tw`text-xl font-bold`}>{size.price_monthly}$</div>
          <div css={tw`text-alt text-xs`}>{size.description}</div>
        </div>
        <ul css={tw`space-y-2`}>
          <li>
            <span css={tw`font-bold`}>{size.vcpu}</span>{' '}
            <span css={tw`text-alt`}>vCPU</span>
          </li>
          <li>
            <span css={tw`font-bold`}>{size.memory}</span>{' '}
            <span css={tw`text-alt`}>Memory</span>
          </li>
          <li>
            <span css={tw`font-bold`}>{size.disk}</span>{' '}
            <span css={tw`text-alt`}>Disk</span>
          </li>
        </ul>
      </div>
    </Card>
  );
}
