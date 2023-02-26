import tw from 'twin.macro';

import { Wrapper } from './styles';

interface Props {
  isActive: boolean;
  onClick: () => void;
  size: any;
}

export default function SizeCard({ isActive, size, onClick }: Props) {
  return (
    <Wrapper onClick={onClick} isActive={isActive}>
      <div css={tw`font-bold text-center`}>${size.price_monthly}</div>
    </Wrapper>
  );
}
