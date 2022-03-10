import * as React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import { BsBoxArrowUpRight } from 'react-icons/bs';

const Markdown: React.FC<{ body: any }> = ({ body }) => {
  return (
    <MDXProvider
      components={{
        a: (props) => {
          const isExternal =
            props.href &&
            !props.href.startsWith('/') &&
            !props.href.startsWith('?') &&
            !props.href.startsWith('#');
          return (
            <a
              {...props}
              className={
                props.className
                  ? props.className
                  : 'group underline-offset-2 transition-colors duration-300 decoration-sky-300 hover:decoration-sky-700'
              }
              rel={isExternal ? 'noopener noreferrer nofollow' : ''}
              target={isExternal ? '_blank' : ''}
            >
              {props.children}
              {isExternal && (
                <BsBoxArrowUpRight className="inline stroke-1 h-2.5 mb-1 transition-colors duration-300 text-sky-300 group-hover:text-sky-700" />
              )}
            </a>
          );
        },
        h1: (props) => <h1 {...props} className="whitespace-pre-wrap" />,
        h2: (props) => <h2 {...props} className="whitespace-pre-wrap" />,
        h3: (props) => <h3 {...props} className="whitespace-pre-wrap" />,
        h4: (props) => <h4 {...props} className="whitespace-pre-wrap" />,
      }}
    >
      <MDXRenderer>{body}</MDXRenderer>
    </MDXProvider>
  );
};

export default Markdown;
