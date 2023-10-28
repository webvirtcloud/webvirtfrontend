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
      <div className="sticky inset-x-0 top-[80px] z-10 border-b bg-white/50 backdrop-blur-md dark:border-neutral-800 dark:bg-black/10 lg:hidden">
        <div className="max-w-8xl mx-auto flex p-4">
          <button onClick={() => setOpen(true)}>
            <Bars3Icon className="h-5 w-5" />
          </button>
        </div>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          className="dark:border-neutral-800 dark:bg-black md:max-w-xs"
          side="left"
        >
          <ul className="space-y-8">
            {Object.entries(navigation).map(([category, docs]) => (
              <li key={category} className="space-y-3">
                <h5 className="font-medium">{toTitleCase(category)}</h5>
                <ul className="space-y-2 border-l dark:border-neutral-800">
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
