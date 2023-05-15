'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { allDocsPosts } from 'contentlayer/generated';

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

export function DocsAside() {
  const pathname = usePathname();
  return (
    <div className="pt-2 pb-20 font-normal text-sm sticky">
      <AsideLinkGroup
        title="入门"
        links={allDocsPosts.filter((post) =>
          post.url.startsWith('/docs/getting-started/'),
        )}
        pathname={pathname}
      />
      <AsideLinkGroup
        title="镜像使用帮助"
        links={allDocsPosts.filter((post) =>
          post.url.startsWith('/docs/mirrors/'),
        )}
        pathname={pathname}
      />
      <AsideLinkGroup
        title="服务使用指南"
        links={allDocsPosts.filter((post) =>
          post.url.startsWith('/docs/services/'),
        )}
        pathname={pathname}
      />
      <AsideLinkGroup
        title="其他文档"
        links={allDocsPosts.filter((post) =>
          post.url.startsWith('/docs/others/'),
        )}
        pathname={pathname}
      />
    </div>
  );
}
