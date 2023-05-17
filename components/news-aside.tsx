'use client';

import { compareDesc, format } from 'date-fns';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { allNewsPosts } from 'contentlayer/generated';

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
              href={`/news/${link.slug}/`}
            >
              {link.short_title ?? link.title}
              <div className="text-xs font-normal text-gray-500">
                发布于 {format(new Date(link.date), 'yyyy 年 M 月 d 日')}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function NewsAside() {
  const pathname = usePathname();
  if (!pathname) return null;
  return (
    <div className="pt-2 pb-20 font-normal text-sm sticky">
      <AsideLinkGroup title="归档" links={allNewsPosts} pathname={pathname} />
    </div>
  );
}
