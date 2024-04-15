import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'ui/components/button';

import { type Size, SizeCard, useSizes } from '@/entities/size';
import { useVirtance, useVirtanceAction } from '@/entities/virtance';

export default function VirtanceResizePage() {
  const params = useParams();
  const id = Number(params.id);
  const [currentSize, setCurrentSize] = useState<Size>();
  const { data: virtance } = useVirtance(id);
  const { data: sizes } = useSizes();
  const { runAction } = useVirtanceAction();

  useEffect(() => {
    if (virtance && sizes) {
      setCurrentSize(sizes.find((item) => !isSizeDisabled(item)));
    }
  }, [virtance, sizes]);

  function isSizeDisabled(size: Size) {
    if (
      virtance &&
      (size.memory < virtance.size.memory ||
        size.vcpu < virtance.size.vcpu ||
        size.disk < virtance.size.disk ||
        size.slug === virtance.size.slug)
    ) {
      return true;
    }

    return false;
  }

  function onResize() {
    if (virtance && currentSize) {
      runAction({ id: virtance.id, action: 'resize', size: currentSize.slug });
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-medium">Resize</h2>
        <p className="text-muted-foreground">Expand size of your virtance in seconds.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sizes &&
          virtance &&
          currentSize &&
          sizes.map((size) => (
            <SizeCard
              key={size.slug}
              isActive={size.slug === currentSize.slug}
              isDisabled={isSizeDisabled(size)}
              size={size}
              onClick={() => setCurrentSize(size)}
            />
          ))}
      </div>
      {virtance?.status === 'active' || virtance?.status === 'pending' ? (
        <p className="text-muted-foreground">
          WARNING: Turn off virtance before resizing.
        </p>
      ) : null}
      <Button
        disabled={
          !currentSize || virtance?.status === 'active' || virtance?.status === 'pending'
        }
        onClick={onResize}
      >
        Resize virtance
      </Button>
    </div>
  );
}
