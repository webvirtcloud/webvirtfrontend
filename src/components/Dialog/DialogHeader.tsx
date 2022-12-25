import XMarkIcon from '@heroicons/react/20/solid/XMarkIcon';
import tw from 'twin.macro';

export const DialogHeader = ({ title, onClose }) => {
  return (
    <div css={tw`flex items-center justify-between mb-4`}>
      <h2 css={tw`text-lg font-bold`}>{title}</h2>

      <button onClick={onClose}>
        <XMarkIcon width={20} height={20} />
      </button>
    </div>
  );
};
