import Image from 'next/image';
import Link from 'next/link';
import ArrowLeftIcon from '@heroicons/react/20/solid/ArrowLeftIcon';
import { type Metadata } from 'next';
import { allPosts } from 'contentlayer/generated';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { Note } from '@/components/note';

interface Props {
  params: { slug: string };
}
const mdxComponents = {
  Note,
} as const;

export function generateStaticParams(): Array<Props['params']> {
  return allPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = allPosts.find((post) => post.slug === params.slug)!;

  if (!post) notFound();

  const description =
    post.description.length > 200
      ? `${post.description.substring(0, 200)}...`
      : post.description;

  return {
    title: `${post.title} - WebVirtCloud Blog`,
    description,
    authors: { name: 'WebVirtCloud Team' },
    openGraph: {
      title: post.title,
      description,
      images: post.image,
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

export default function Page({ params }: Props) {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) notFound();

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Link href={'/blog'} className="flex items-center gap-2">
          <ArrowLeftIcon className="h-4 w-4" />
          Go back
        </Link>
      </div>
      <div className="mx-auto w-full max-w-3xl space-y-16 px-4 md:px-8">
        <article className="prose prose-img:rounded-md lg:prose-lg dark:prose-p:text-neutral-400 prose-p:text-neutral-600 dark:prose-p:font-light dark:prose-invert prose-h1:mb-0 xl:prose-h1:mb-0 mx-auto pt-8">
          <div className="mb-4 text-sm text-neutral-500">
            <span>{post.readTime}</span> /{' '}
            <time>{format(new Date(post.date), 'MMMM dd, yyyy')}</time>
          </div>

          <h1 className="text-4xl font-bold">{post.title}</h1>

          <Image
            src={post.image}
            width={768}
            height={400}
            priority
            alt={post.imageAlt || post.title}
            className="rounded-xl border dark:border-neutral-800"
          />

          <MDXContent components={mdxComponents} />
        </article>
      </div>
    </div>
  );
}
