import { notFound } from 'next/navigation';
import { type Metadata } from 'next/types';
import { allDocsPosts } from 'contentlayer/generated';

import { MDXContent } from '@/components/mdx-content';
import { DocsAside } from '@/components/docs-aside';

type PostPageProps = {
  params: {
    slug: string[];
  };
};

export async function generateStaticParams(): Promise<
  PostPageProps['params'][]
> {
  return allDocsPosts.map(({ slug }) => ({
    slug: slug.split('/'),
  }));
}

export function generateMetadata({ params }: PostPageProps): Metadata {
  const { title, excerpt, url } = allDocsPosts.find(
    ({ slug }) => slug === params.slug.join('/'),
  ) || {
    title: 'Post Not Found',
    excerpt: null,
    url: '/docs',
    date: new Date().toISOString(),
  };

  const description = excerpt ?? 'Post Not Found';

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      title,
      description,
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
    },
  };
}

export default function PostPage({ params }: PostPageProps) {
  const post = allDocsPosts.find(({ slug }) => slug === params.slug.join('/'));

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl w-full flex mx-auto p-4 space-x-6">
        <div className="flex-initial">
          <DocsAside />
        </div>
        <div className="py-6 basis-3/4">
          <div className="pt-2">
            <div className="pb-4 mb-8 border-b border-gray-200 dark:border-gray-800">
              <h1
                className="inline-block mb-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white"
                id="content"
              >
                {post.title}
              </h1>
              <p className="mb-4 text-lg text-gray-600 dark:text-gray-400">
                {post.excerpt}
              </p>
            </div>
            <MDXContent code={post.body.code} />
          </div>
        </div>
      </div>
    </div>
  );
}
