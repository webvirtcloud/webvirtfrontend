'use client';

import Bars3Icon from '@heroicons/react/20/solid/Bars3Icon';
import { useState } from 'react';
import { Sheet, SheetContent } from 'ui/components/sheet';
import { toTitleCase } from '@/utils';
import { SidebarNavItem } from './sidebar-nav-item';
import { type Doc } from 'contentlayer/generated';

export default function MobileSidebar({
  navigation,
}: {
  navigation: Record<string, Doc[]>;
}) {
  const [open, setOpen] = useState(false);

  function onNavItemClick() {
    setOpen(false);
  }

  return (
    <>
      <div className="bg-background sticky inset-x-0 top-16 z-10 border-b backdrop-blur-md lg:hidden">
        <div className="container mx-auto flex p-4">
          <button onClick={() => setOpen(true)}>
            <Bars3Icon className="h-5 w-5" />
          </button>
        </div>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="md:max-w-xs" side="left">
          <ul className="space-y-8">
            {Object.entries(navigation).map(([category, docs]) => (
              <li key={category} className="space-y-3">
                <h5 className="font-medium">{toTitleCase(category)}</h5>
                <ul className="space-y-2 border-l">
                  {docs.map((doc) => (
                    <SidebarNavItem key={doc._id} doc={doc} onClick={onNavItemClick} />
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </>
  );
}
