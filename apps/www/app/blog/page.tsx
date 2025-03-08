import Link from 'next/link';
import Image from 'next/image';
import { allPosts } from '@/.contentlayer/generated';
import { compareDesc, format } from 'date-fns';

export default function Page() {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <div className="mx-auto max-w-4xl space-y-16 px-4 py-12 md:px-8">
      <header className="space-y-4">
        <h1 className="text-3xl font-bold">All posts</h1>
        <p className="text-muted-foreground">Get the latest updates from WebVirtCloud</p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {posts.map((post) => (
          <section key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="block rounded-xl border p-2 dark:border-neutral-800"
            >
              <Image
                src={post.image}
                width={900}
                height={500}
                priority
                alt={post.imageAlt || post.title}
                className="rounded-md"
              />

              <div className="space-y-4 p-6">
                <h2 className="text-4xl font-semibold">{post.title}</h2>
                <div className="text-muted-foreground">
                  <span>{post.readTime}</span> /{' '}
                  <time>{format(new Date(post.date), 'MMMM dd, yyyy')}</time>
                </div>
              </div>
            </Link>
          </section>
        ))}
      </div>
    </div>
  );
}
