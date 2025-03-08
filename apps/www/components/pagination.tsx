import Link from 'next/link';
import ArrowRightIcon from '@heroicons/react/20/solid/ChevronRightIcon';
import ArrowLeftIcon from '@heroicons/react/20/solid/ChevronLeftIcon';
import { type Doc } from '@/.contentlayer/generated';

export function Pagination({ prev, next }: { prev?: Doc; next?: Doc }) {
  return (
    <nav className="mt-8 flex items-start justify-between border-t pt-8 dark:border-neutral-800">
      {prev ? (
        <Link
          className="mr-auto space-y-1"
          href={prev.url}
          aria-label={`Go to previous page: ${prev.title}`}
        >
          <div className="text-muted-foreground pl-6 text-sm">Previous</div>
          <div className="flex items-center gap-2">
            <ArrowLeftIcon className="h-4 w-4" />
            {prev.title}
          </div>
        </Link>
      ) : null}
      {next ? (
        <Link
          className="ml-auto space-y-1"
          href={next.url}
          aria-label={`Go to next page: ${next.title}`}
        >
          <div className="text-muted-foreground pr-6 text-sm">Next</div>
          <div className="flex items-center gap-2">
            {next.title}
            <ArrowRightIcon className="h-4 w-4" />
          </div>
        </Link>
      ) : null}
    </nav>
  );
}
