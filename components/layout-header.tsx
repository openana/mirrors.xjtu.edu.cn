'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Navbar } from 'flowbite-react';
import { useNavbarContext } from 'flowbite-react/lib/esm/components/Navbar/NavbarContext';

import { type SiteHeaderConfig, type SitePageConfig } from '@/config/types';

function NavbarLink({ page }: { page: SitePageConfig }) {
  const pathname = usePathname();
  if (!pathname) return null;
  // TODO: fix this
  // const { isOpen, setIsOpen } = useNavbarContext();
  return (
    <Navbar.Link
      as={Link}
      href={page.href}
      active={
        (page.activeSelector === '/' && pathname === page.activeSelector) ||
        (page.activeSelector !== '/' &&
          pathname.startsWith(page.activeSelector))
      }
      // onClick={() => isOpen && setIsOpen(false)}
    >
      {page.title}
    </Navbar.Link>
  );
}

type LayoutHeaderProps = {
  title: string;
} & SiteHeaderConfig;

export function LayoutHeader(props: LayoutHeaderProps) {
  return (
    <div className="z-40 flex-none mx-auto w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <Navbar>
        <Navbar.Brand as={Link} className="h-12" href="/">
          <span className="self-center text-2xl font-medium whitespace-nowrap text-sky-700 dark:text-white">
            {props.title}
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          {props.pages.map((page, key) => (
            <NavbarLink key={key} page={page} />
          ))}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
