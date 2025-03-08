import Link from 'next/link';
import ChevronRightIcon from '@heroicons/react/20/solid/ChevronRightIcon';

const sections = [
  {
    title: 'Introduction',
    description:
      'In this section you will learn what WebVirtCloud is and how its fits for your needs.',
    link: {
      label: 'Learn more',
      href: '/docs/introduction',
    },
  },
  {
    title: 'Installation',
    description:
      'Learn the basics of WebVirtCloud to quickly run your own sefl-hosted cloud platform.',
    link: {
      label: 'Get started',
      href: '/docs/installation/setup-controller',
    },
  },
];

export default function Page() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-neutral-200">
        WebVirtCloud Documentation
      </h1>
      <p className="mt-4 text-lg">
        Here is a documentation of WebVirtCloud where you can find all information needed
        to get started, how to use API and so on.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {sections.map((section) => (
          <div className="flex flex-col" key={section.title}>
            <div className="mt-6 grow rounded-t-xl border p-6 dark:border-neutral-800">
              <h3 className="mb-4 text-xl font-medium">{section.title}</h3>
              <p className="text-muted-foreground">{section.description}</p>
            </div>
            <div className="rounded-b-xl border bg-neutral-100 p-6 py-4 dark:border-neutral-800 dark:bg-neutral-900">
              <Link
                className="inline-flex items-center space-x-1.5 text-sky-500 no-underline hover:text-sky-600 dark:text-sky-500 "
                href={section.link.href}
              >
                <span>{section.link.label}</span>
                <span className="block w-2">
                  <ChevronRightIcon className="h-5 w-5" />
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
