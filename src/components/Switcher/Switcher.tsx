import { useState } from 'react';
import tw from 'twin.macro';

import { ArrowDown } from '@/components/Icons';

const Switcher = (): JSX.Element => {
  const [isOpen, toggle] = useState(false);
  return (
    <button
      onClick={() => toggle(true)}
      type="button"
      css={tw`flex items-center justify-between text-left bg-black/20 hover:bg-black/25 transition-opacity rounded-full py-2 px-3`}
    >
      <div css={tw`flex items-center space-x-3`}>
        <figure css={tw`flex-shrink-0 w-8 h-8 bg-cyan-500 rounded-full`}></figure>
        <div>
          <h4 css={tw`font-bold`}>Basic</h4>
          <p css={tw`text-white/50 text-xs`}>1488 VMs</p>
        </div>
      </div>

      <ArrowDown />
    </button>
  );
};

export default Switcher;
