import { ReactNode } from 'react';
import tw from 'twin.macro';

import { Portal } from '../Portal';
import { DialogHeader } from './DialogHeader';

type Props = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

const DialogMask = tw.div`
  fixed
  inset-0
  bg-black/50
  flex
  items-center
  justify-center
`;

const DialogContainer = tw.div`
  bg-base
  w-full
  max-w-lg
  p-4
  rounded-md
  focus:outline
  focus:outline-2
  focus:outline-offset-2
  focus:outline-blue-700
`;

export default function Dialog({ isOpen, title, onClose, children }: Props) {
  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <DialogMask>
        <DialogContainer tabIndex={0}>
          <DialogHeader onClose={onClose} title={title} />
          <div>{children}</div>
        </DialogContainer>
      </DialogMask>
    </Portal>
  );
}
