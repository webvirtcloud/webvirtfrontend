'use client';

import { type Doc } from 'contentlayer/generated';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { cx } from 'ui/lib';

export function SidebarNavItem({ doc, onClick }: { doc: Doc; onClick?: () => void }) {
  const params = useParams<{ slug?: string[] }>();
  const slug = params.slug?.join('/');
  const isActive = doc.slug === slug;

  return (
    <li>
      <Link
        href={doc.url}
        onClick={onClick}
        className={cx([
          '-ml-px border-l pl-4',
          isActive
            ? ['border-sky-500 text-sky-500']
            : [
                'border-transparent opacity-50 hover:border-neutral-500 hover:opacity-100',
              ],
        ])}
      >
        {doc.title}
      </Link>
    </li>
  );
}
