import CheckCircleIcon from '@heroicons/react/20/solid/CheckCircleIcon';
import tw from 'twin.macro';

import type { Toast as ToastType } from './Provider';

interface Props {
  toast: ToastType;
}

export const Toast = ({ toast: { message, type } }: Props): JSX.Element => {
  return (
    <div
      role="alert"
      css={tw`flex items-center bg-base shadow-xl rounded-md space-x-3 p-4`}
    >
      <span css={tw`block text-green-500 h-5 w-5`}>
        <CheckCircleIcon />
      </span>
      <p>{message}</p>
    </div>
  );
};
