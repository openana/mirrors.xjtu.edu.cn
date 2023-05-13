import { notFound } from 'next/navigation';
import { type Metadata } from 'next/types';
import { allNewsPosts } from 'contentlayer/generated';

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
  return allNewsPosts.map(({ slug }) => ({
    slug: slug.split('/'),
  }));
}

export function generateMetadata({ params }: PostPageProps): Metadata {
  const { title, excerpt, url, date } = allNewsPosts.find(
    ({ slug }) => slug === params.slug.join('/'),
  ) || {
    title: 'Post Not Found',
    excerpt: null,
    url: '/news',
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
      publishedTime: date,
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
    },
  };
}

export default function PostPage({ params }: PostPageProps) {
  const post = allNewsPosts.find(({ slug }) => slug === params.slug.join('/'));

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl w-full flex flex-col mx-auto p-4 space-y-6">
        <PostIntro title={post.title} date={post.date} tags={post.tags} />
        <MDXContent code={post.body.code} />
      </div>
    </div>
  );
}
