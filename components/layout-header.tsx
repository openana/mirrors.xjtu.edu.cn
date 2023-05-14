'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { type SiteHeaderConfig } from '@/config/types';

type LayoutHeaderProps = {
  title: string;
} & SiteHeaderConfig;

export function LayoutHeader(props: LayoutHeaderProps) {
  const pathname = usePathname();
  return (
    <div className="bg-white border-b border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center h-10">
          <span className="self-center text-2xl font-medium whitespace-nowrap text-sky-700 dark:text-white">
            {props.title}
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {props.pages.map((page, key) => (
              <li key={key}>
                <Link
                  className={
                    (page.activeSelector === '/' &&
                      pathname === page.activeSelector) ||
                    (page.activeSelector !== '/' &&
                      pathname.startsWith(page.activeSelector))
                      ? 'block py-2 pl-3 pr-4 rounded md:p-0 dark:text-white text-white bg-sky-700 md:bg-transparent md:text-sky-700 md:dark:text-sky-500'
                      : 'block py-2 pl-3 pr-4 rounded md:p-0 dark:text-white text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-sky-700 md:dark:hover:text-sky-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                  }
                  href={page.href}
                >
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
