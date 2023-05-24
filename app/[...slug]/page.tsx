import { notFound } from 'next/navigation';
import { type Metadata } from 'next/types';
import { allPages } from 'contentlayer/generated';

import { MDXContent } from '@/components/mdx-content';
import { PostIntro } from '@/components/post-intro';

type PostPageProps = {
  params: {
    slug: string[];
  };
};

export async function generateStaticParams(): Promise<
  PostPageProps['params'][]
> {
  return allPages.map(({ slug }) => ({
    slug: slug.split('/'),
  }));
}

export function generateMetadata({ params }: PostPageProps): Metadata {
  const { title } = allPages.find(
    ({ slug }) => slug === params.slug.join('/'),
  ) || {
    title: 'Post Not Found',
    excerpt: null,
    url: '/',
    date: new Date().toISOString(),
  };

  return {
    title,
    openGraph: {
      type: 'article',
      title,
    },
    twitter: {
      title,
      card: 'summary_large_image',
    },
  };
}

export default function PostPage({ params }: PostPageProps) {
  const post = allPages.find(({ slug }) => slug === params.slug.join('/'));

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-screen-xl w-full mx-auto p-4">
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
  );
}
