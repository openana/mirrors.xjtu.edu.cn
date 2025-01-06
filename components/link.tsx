import NextLink from 'next/link';

type LinkProps = {
  className?: string;
  title: string;
  href: string;
};

export const Link = ({ className, title, href }: LinkProps) => (
  <NextLink
    className={className}
    href={href}
    {...(href.startsWith('//') && {
      target: '_blank',
      rel: 'noopener noreferrer',
    })}
  >
    {title}
  </NextLink>
);
