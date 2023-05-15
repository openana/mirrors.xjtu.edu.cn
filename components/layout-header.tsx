'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Navbar } from 'flowbite-react';

import { type SiteHeaderConfig } from '@/config/types';

type LayoutHeaderProps = {
  title: string;
} & SiteHeaderConfig;

export function LayoutHeader(props: LayoutHeaderProps) {
  const pathname = usePathname();
  return (
    <div>
      <Navbar>
        <Navbar.Brand as={Link} className="h-12" href="/">
          <span className="self-center text-2xl font-medium whitespace-nowrap text-sky-700 dark:text-white">
            {props.title}
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          {props.pages.map((page, key) => (
            <Navbar.Link
              key={key}
              as={Link}
              href={page.href}
              active={
                (page.activeSelector === '/' &&
                  pathname === page.activeSelector) ||
                (page.activeSelector !== '/' &&
                  pathname.startsWith(page.activeSelector))
              }
            >
              {page.title}
            </Navbar.Link>
          ))}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
