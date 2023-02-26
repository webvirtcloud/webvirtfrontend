import tw from 'twin.macro';

import { Wrapper } from './styles';

interface Props {
  isActive: boolean;
  onClick: () => void;
  region: any;
}
export default function RegionCard({ isActive, region, onClick }: Props) {
  return (
    <Wrapper onClick={onClick} isActive={isActive}>
      <div css={tw`font-bold`}>{region.name}</div>
    </Wrapper>
  );
}
