import InformationCircleIcon from '@heroicons/react/20/solid/InformationCircleIcon';
import { type PropsWithChildren } from 'react';

export function Note({
  children,
  title = 'Note',
}: PropsWithChildren<{ title?: string }>) {
  return (
    <div className="rounded border-l-4 border-yellow-400 bg-yellow-400/20 px-4 py-3 dark:bg-yellow-300/20">
      <div className="mb-1 flex items-center gap-2 text-sm font-bold uppercase text-yellow-800 dark:text-yellow-500">
        <InformationCircleIcon className="inline-block h-4 w-4" />
        {title}
      </div>
      <p className="m-0 text-yellow-700 dark:text-yellow-50">{children}</p>
    </div>
  );
}
