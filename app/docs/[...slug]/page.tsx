'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { allDocsPosts } from 'contentlayer/generated';

import { MDXContent } from '@/components/mdx-content';

type AsideLinkGroupProps = {
  title: string;
  links: any[];
  pathname: string;
};

function AsideLinkGroup(props: AsideLinkGroupProps) {
  return (
    <div className="mt-8">
      <h2 className="mb-2 text-base font-semibold tracking-wide text-gray-900 uppercase">
        {props.title}
      </h2>
      <ul className="py-1 list-unstyled fw-normal small">
        {props.links.map((link) => (
          <li key={link.slug}>
            <Link
              className={`mb-2 px-4 py-2 transition-colors duration-200 rounded relative flex items-center flex-wrap font-medium hover:text-sky-900 hover:bg-sky-100 ${
                props.pathname === `/docs/${link.slug}/`
                  ? 'text-sky-900 bg-sky-50'
                  : 'text-sky-700'
              }`}
              href={`/docs/${link.slug}/`}
            >
              {link.short_title ?? link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

type PostPageProps = {
  params: {
    slug: string[];
  };
};

export default function PostPage({ params }: PostPageProps) {
  const post = allDocsPosts.find(({ slug }) => slug === params.slug.join('/'));

  if (!post) {
    notFound();
  }

  const pathname = usePathname();

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl w-full flex mx-auto p-4 space-x-6">
        <div className="flex-initial">
          <div className="pt-2 pb-20 w-60 font-normal text-sm sticky">
            <AsideLinkGroup
              title="入门"
              links={allDocsPosts.filter((post) =>
                post.slug.startsWith('getting-started/'),
              )}
              pathname={pathname}
            />
            <AsideLinkGroup
              title="镜像使用帮助"
              links={allDocsPosts.filter((post) =>
                post.slug.startsWith('mirrors/'),
              )}
              pathname={pathname}
            />
            <AsideLinkGroup
              title="服务使用指南"
              links={allDocsPosts.filter((post) =>
                post.slug.startsWith('services/'),
              )}
              pathname={pathname}
            />
            <AsideLinkGroup
              title="其他文档"
              links={allDocsPosts.filter((post) =>
                post.slug.startsWith('others/'),
              )}
              pathname={pathname}
            />
          </div>
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
