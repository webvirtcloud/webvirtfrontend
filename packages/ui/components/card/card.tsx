import { ReactNode } from 'react';
import tw, { styled } from 'twin.macro';

const Wrapper = styled.div(({ isActive }: { isActive: boolean }) => [
  tw`p-4 cursor-pointer border rounded-md bg-base`,
  isActive ? tw`border-sky-500 ring-1 ring-sky-500` : tw``,
]);

interface Props {
  isActive: boolean;
  onClick: () => void;
  children: ReactNode;
}

export function Card({ isActive, children, onClick }: Props) {
  return (
    <Wrapper onClick={onClick} isActive={isActive}>
      {children}
    </Wrapper>
  );
}
