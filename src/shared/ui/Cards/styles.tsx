import tw, { styled } from 'twin.macro';

export const Wrapper = styled.div(({ isActive }: { isActive: boolean }) => [
  tw`flex justify-between gap-4 w-full p-4 cursor-pointer border rounded-md bg-base`,
  isActive ? tw`border-blue-500 ring-1 ring-blue-500` : tw``,
]);
