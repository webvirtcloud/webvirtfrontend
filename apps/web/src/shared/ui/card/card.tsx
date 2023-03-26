import { type ReactNode } from 'react';
import { cx } from 'ui/lib';

interface Props {
  isActive: boolean;
  onClick: () => void;
  children: ReactNode;
}

export function Card({ isActive, children, onClick }: Props) {
  return (
    <div
      className={cx([
        'bg-base cursor-pointer rounded-md border p-4',
        isActive ? 'border-sky-500 ring-1 ring-sky-500' : '',
      ])}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
