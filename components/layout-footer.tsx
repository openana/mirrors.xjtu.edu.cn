import Image from 'next/image';

import { Link } from '@/components/link';
import { type SiteFooterConfig } from '@/config/types';
import { markdownToHtml } from '@/lib/markdown';

const fullYear = new Date().getFullYear();

type CopyrightProps = {
  className?: string;
  title: string;
  href: string;
};

const Copyright = ({ className, title, href }: CopyrightProps) => (
  <div className={className}>
    Copyright © {fullYear}{' '}
    <Link
      className="hover:text-neutral-700 hover:underline"
      title={title}
      href={href}
    />
    . 保留所有权利。
  </div>
);

type FooterLinkProps = {
  title: string;
  href: string;
};

const FooterLink = ({ title, href }: FooterLinkProps) => (
  <Link
    className="hover:text-neutral-700 hover:underline"
    title={title}
    href={href}
    {...(href.startsWith('//') && {
      target: '_blank',
      rel: 'noopener noreferrer',
    })}
  />
);

const FooterDescription = ({ description }: { description: string }) => (
  <div
    dangerouslySetInnerHTML={{
      __html: markdownToHtml(description, (content: string) =>
        content
          // this is a hack to add a class to the p and a tags
          .replaceAll('<p>', '<p class="mb-4 leading-7">')
          .replaceAll(
            '<a ',
            '<a class="transition-colors text-sky-700 border-b border-sky-300 hover:text-sky-800 hover:border-sky-800" target="_blank" rel="noopener noreferrer" ',
          ),
      ),
    }}
  />
);

type LayoutFooterProps = SiteFooterConfig;

export function LayoutFooter(props: LayoutFooterProps) {
  return (
    <div className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto flex flex-col">
        <div className="flex flex-wrap items-center justify-between p-4 text-sm text-neutral-500">
          <div className="max-w-3xl">
            <FooterDescription description={props.description} />
          </div>
          <div className="ml-autox px-6 py-4">
            <Image
              src={props.logo.src}
              alt={props.logo.alt}
              width={128}
              height={128}
            />
          </div>
        </div>
        <div className="flex flex-row-reverse items-center justify-end flex-wrap p-4 text-xs text-neutral-600">
          <div className="h-6 mt-4">
            {props.links.map((link, key) => (
              <div key={key} className="pr-6 pb-2 inline-block ">
                <FooterLink href={link.href} title={link.title} />
              </div>
            ))}
          </div>
          <div className="mr-auto h-6 mt-4">
            <Copyright {...props.copyright} />
          </div>
        </div>
      </div>
    </div>
  );
}
