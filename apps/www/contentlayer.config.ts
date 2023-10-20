// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import readingTime from 'reading-time';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.md`,
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

export default makeSource({ contentDirPath: 'posts', documentTypes: [Post] });
