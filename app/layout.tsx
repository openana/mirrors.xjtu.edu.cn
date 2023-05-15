import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import { type Metadata } from 'next/types';

import FlowbiteContext from '@/app/flowbite-context';
import { LayoutHeader } from '@/components/layout-header';
import { LayoutFooter } from '@/components/layout-footer';
import { siteConfig } from '@/config';

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.title} · ${siteConfig.title_en}`,
    template: `%s · ${siteConfig.title} · ${siteConfig.title_en}`,
  },
};

const inter = Inter({ subsets: ['latin'] });

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <FlowbiteContext>
          <LayoutHeader title={siteConfig.title} {...siteConfig.header} />
          {children}
          <LayoutFooter {...siteConfig.footer} />
        </FlowbiteContext>
      </body>
    </html>
  );
}
