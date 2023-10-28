// contentlayer.config.ts
import readingTime from 'reading-time';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode, { type Options } from 'rehype-pretty-code';
import GithubSlugger from 'github-slugger';
import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { toTitleCase } from './utils';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.md`,
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    image: { type: 'string', required: true },
    imageAlt: { type: 'string', required: false },
    date: { type: 'date', required: true },
  },
  computedFields: {
    readTime: { type: 'string', resolve: (post) => readingTime(post.body.raw).text },
    url: { type: 'string', resolve: (post) => `/posts/${post._raw.flattenedPath}` },
    slug: {
      type: 'string',
      resolve: (post) => post._raw.sourceFileName.replace(/\.md$/, ''),
    },
  },
}));

export const Doc = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: `docs/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
      description: 'Used for SEO and social media sharing',
      required: false,
      default: '',
    },
    index: {
      type: 'number',
      required: true,
    },
  },
  computedFields: {
    url: { type: 'string', resolve: (document) => `/${document._raw.flattenedPath}` },
    slug: {
      type: 'string',
      resolve: (document) => document._raw.flattenedPath.replace(/^.+?(\/)/, ''),
    },
    title: {
      type: 'string',
      resolve: (document) =>
        document.title
          ? toTitleCase(document.title)
          : toTitleCase(
              document._raw.flattenedPath
                .replace(/^.+?(\/)/, '')
                .split('/')
                .slice(-1)[0],
            ),
    },
    section: {
      type: 'string',
      resolve: (document) =>
        document._raw.flattenedPath.replace(/^.+?(\/)/, '').split('/')[0],
    },
    headings: {
      type: 'json',
      resolve: async (doc) => {
        const regXHeader = /\n(?<flag>#{2,4})\s+(?<content>.+)/g;
        const slugger = new GithubSlugger();
        const headings = Array.from(doc.body.raw.matchAll(regXHeader)).map(
          ({ groups }) => {
            const flag = groups?.flag;
            const content = groups?.content;
            return {
              level: flag?.length,
              text: content,
              slug: content ? slugger.slug(content) : undefined,
            };
          },
        );
        return headings;
      },
    },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Doc],
  mdx: {
    rehypePlugins: [rehypeSlug, [rehypePrettyCode, {} as Options]],
  },
});
