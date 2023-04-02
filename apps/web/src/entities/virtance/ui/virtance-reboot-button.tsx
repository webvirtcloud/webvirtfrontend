import ArrowPathIcon from '@heroicons/react/20/solid/ArrowPathIcon';
import { Button } from 'ui/components/button';
import { cx } from 'ui/lib';
import { MouseEvent } from 'react';
import { type VirtanceAction, VirtanceStatus } from '../types';

interface Props {
  id: number;
  status: VirtanceStatus;
  onToggle: (payload: { id: number; action: VirtanceAction }) => void;
}

export function VirtanceRebootButton({ id, status, onToggle }: Props) {
  function handleClick(e: MouseEvent) {
    e.preventDefault();
    onToggle({ id, action: 'reboot' });
  }

  return (
    <Button
      disabled={status === 'pending'}
      variant="secondary"
      className="w-8 p-0"
      onClick={handleClick}
    >
      <ArrowPathIcon className={cx('mx-auto h-4 w-4')} />
    </Button>
  );
}
