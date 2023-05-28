import CommandLineIcon from '@heroicons/react/20/solid/CommandLineIcon';
import { Button } from 'ui/components/button';

export function VirtanceOpenConsoleButton({ id }) {
  const openConsole = () => {
    window.open(`/virtances/${id}/console`, '_blank', 'width=800, height=600');
  };

  return (
    <Button onClick={openConsole} variant="secondary" className="w-8 p-0">
      <CommandLineIcon className="h-4 w-4 text-neutral-600" />
    </Button>
  );
}
