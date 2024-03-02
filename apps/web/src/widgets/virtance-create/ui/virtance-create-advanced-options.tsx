import MinusIcon from '@heroicons/react/16/solid/MinusIcon';
import PlusIcon from '@heroicons/react/16/solid/PlusIcon';
import { useState } from 'react';

import { VirtanceCreateUserdata } from './virtance-create-userdata';

export function VirtanceCreateAdvancedOptions() {
  const [isOpen, setIsOpen] = useState(false);

  const Icon = isOpen ? MinusIcon : PlusIcon;

  return (
    <div className="space-y-2">
      <button
        type="button"
        className="flex items-center gap-1 font-medium text-sky-500"
        onClick={() => setIsOpen((value) => !value)}
      >
        {<Icon className="h-4 w-4" />}
        Advanced options
      </button>
      {isOpen ? (
        <>
          <VirtanceCreateUserdata />
        </>
      ) : null}
    </div>
  );
}
