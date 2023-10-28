'use client';

import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';
import { cx } from 'ui/lib';

export function NavigationItem({ children, href }: PropsWithChildren<{ href: string }>) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);
  return (
    <li>
      <Link
        className={cx(
          'transition-colors hover:text-black dark:hover:text-white',
          isActive && 'font-medium text-black dark:text-white',
        )}
        href={href}
      >
        {children}
      </Link>
    </li>
  );
}
