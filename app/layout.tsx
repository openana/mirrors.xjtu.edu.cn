import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import { type Metadata } from 'next/types';

import { LayoutHeader } from '@/components/layout-header';
import { LayoutFooter } from '@/components/layout-footer';

import { siteConfig } from '@/config';

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.title}`,
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
        <div className="h-full flex flex-col">
          <LayoutHeader title={siteConfig.title} {...siteConfig.header} />
          {children}
          <LayoutFooter {...siteConfig.footer} />
        </div>
      </body>
    </html>
  );
}
