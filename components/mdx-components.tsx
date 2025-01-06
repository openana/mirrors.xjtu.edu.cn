import Link from 'next/link';

/**
 * Use <Link> for internal links and <a> for external links and anchors
 * and open external links in a new tab
 */
function a({ href, children }: React.HTMLProps<HTMLAnchorElement>) {
  if (href && href.startsWith('/')) {
    return <Link href={href}>{children}</Link>;
  }

  if (href && href.startsWith('#')) {
    return <a href={href}>{children}</a>;
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

/**
 * Use div instead of p elements since p elements have restrictions on what
 * elements can be nested inside them
 */
function p(props: React.HTMLProps<HTMLParagraphElement>) {
  return <div className={'my-4 ' + props.className} {...props} />;
}

export const MDXComponents = { a, p };
