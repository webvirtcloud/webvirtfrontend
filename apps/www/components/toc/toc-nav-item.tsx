'use client';

import ChevronRightIcon from '@heroicons/react/20/solid/ChevronRightIcon';
import { useEffect, useRef, useState } from 'react';
import { cx } from 'ui/lib';
import { type Heading } from './types';

export function TocNavItem({ heading }: { heading: Heading }) {
  const [isActive] = useHighlighted(heading.slug!);

  return (
    <li key={heading.slug} className={cx([heading.level && heading.level > 2 && 'ml-4'])}>
      <a
        className={cx([
          'block py-1',
          heading.level && heading.level > 2 && 'group flex items-start py-1',
          isActive
            ? 'text-sky-500'
            : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300',
        ])}
        href={`#${heading.slug}`}
      >
        {heading.level && heading.level > 2 && <ChevronRightIcon className="h-6 w-4" />}
        {heading.text}
      </a>
    </li>
  );
}

function useHighlighted(id: string) {
  const observer = useRef<IntersectionObserver>();
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: '0% 0% -60% 0%',
    });

    const elements = document.querySelectorAll('h2, h3, h4');
    elements.forEach((elem) => observer.current?.observe(elem));
    return () => observer.current?.disconnect();
  }, []);

  return [activeId === id, setActiveId];
}
