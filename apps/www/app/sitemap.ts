import { MetadataRoute } from 'next';
import { compareDesc } from 'date-fns';
import { allPosts } from '@/.contentlayer/generated';

export const baseUrl = 'https://webvirt.cloud';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = allPosts
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.date,
    }));

  const routes = [
    '',
    '/blog',
    '/docs',
    '/docs/introduction',
    '/docs/installation/setup-controller',
    '/docs/installation/setup-hypervisor',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...posts];
}
