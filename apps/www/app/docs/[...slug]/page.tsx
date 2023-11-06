import ArrowRightCircleIcon from '@heroicons/react/20/solid/ArrowLongRightIcon';
import { allDocs } from 'contentlayer/generated';
import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { Toc } from '@/components/toc';
import { Pagination } from '@/components/pagination';
import { Note } from '@/components/note';

interface Props {
  params: { slug: string[] };
}

const mdxComponents = {
  Note,
} as const;

export function generateStaticParams(): Array<Props['params']> {
  const slugs = allDocs.map((doc) => doc.slug);
  return slugs.map((slug) => ({ slug: slug.split('/') }));
}

export function generateMetadata({ params }: Props): Metadata {
  const doc = allDocs.find((doc) => doc.slug === params.slug.join('/'));

  if (!doc) notFound();

  const title = `${doc.title} - WebVirtCloud Documentation`;

  const description =
    doc.description.length > 200
      ? `${doc.description.substring(0, 200)}...`
      : doc.description;

  return {
    title,
    description,
    openGraph: { title, description },
    authors: { name: 'WebVirtCloud Team' },
  };
}

export default function Page({ params }: Props) {
  const doc = allDocs.find((doc) => doc.slug === params.slug.join('/'));

  if (!doc) notFound();

  const next =
    allDocs[allDocs.findIndex((doc) => doc.slug === params.slug.join('/')) + 1];

  const prev =
    allDocs[allDocs.findIndex((doc) => doc.slug === params.slug.join('/')) - 1];

  const MDXContent = useMDXComponent(doc.body.code);

  return (
    <>
      <article className="mx-auto w-full min-w-0 max-w-none px-2 md:px-6">
        <div className="mb-10">
          <h1 className="mb-4 text-4xl font-bold">{doc.title}</h1>
          <p className="text-lg text-neutral-700 dark:text-neutral-300">
            {doc.description}
          </p>
        </div>
        <div className="prose dark:prose-invert prose-pre:bg-transparent prose-code:break-words prose-headings:scroll-mt-28 max-w-none">
          <MDXContent components={mdxComponents} />
        </div>
        {next || prev ? <Pagination next={next} prev={prev} /> : null}
      </article>

      <div className="sticky top-32 hidden h-full w-56 shrink-0 lg:block">
        <Toc headings={doc.headings} />
        <div className="mt-4 border-t pb-4 dark:border-neutral-800"></div>
        <a
          className="inline-flex items-center gap-2 text-sm text-neutral-500"
          target="_blank"
          href={`https://github.com/webvirtcloud/webvirtfrontend/tree/master/apps/www/content/${doc._raw.sourceFilePath}`}
        >
          Edit this page on GitHub
          <ArrowRightCircleIcon className="h-4 w-4" />
        </a>
      </div>
    </>
  );
}
