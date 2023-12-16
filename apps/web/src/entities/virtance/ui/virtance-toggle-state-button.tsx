import PlayIcon from '@heroicons/react/20/solid/PlayIcon';
import StopIcon from '@heroicons/react/20/solid/StopIcon';
import { MouseEvent } from 'react';
import { Button } from 'ui/components/button';
import { cx } from 'ui/lib';

import { type ActionType, type VirtanceStatus } from '@/entities/virtance';

interface Props {
  id: number;
  status: VirtanceStatus;
  onToggle: (payload: { id: number; action: ActionType['action'] }) => void;
}

export function VirtanceToggleStateButton({ id, status, onToggle }: Props) {
  function handleClick(e: MouseEvent) {
    e.preventDefault();
    onToggle({ id, action: status === 'active' ? 'shutdown' : 'power_on' });
  }

  return (
    <Button
      disabled={status === 'pending'}
      variant="secondary"
      className="w-8 p-0"
      onClick={handleClick}
    >
      {status === 'active' ? (
        <StopIcon className="mx-auto h-4 w-4 text-red-500" />
      ) : (
        <PlayIcon
          className={cx(
            'mx-auto h-4 w-4',
            status === 'pending' ? 'text-inherit' : 'text-green-500',
          )}
        />
      )}
    </Button>
  );
}
