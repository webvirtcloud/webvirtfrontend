import { useWindowSize } from '@uidotdev/usehooks';
import { LucidePanelLeft } from 'lucide-react';
import { Button } from 'ui/components/button';

import { useSidebar } from '@/shared/hooks/use-sidebar';

export function SidebarTrigger() {
  const { toggleSidebar } = useSidebar();
  const { width } = useWindowSize();
  const isMobile = width && width < 1024;

  if (isMobile) {
    return (
      <Button
        onClick={() => toggleSidebar()}
        variant="outline"
        size="icon"
        className="h-7 w-7 lg:hidden"
      >
        <LucidePanelLeft className="h-4 w-4" />
      </Button>
    );
  }
  return null;
}
