import * as React from 'react';
import { Link } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Highlight, { Prism } from 'prism-react-renderer';
import nightOwl from 'prism-react-renderer/themes/nightOwlLight';

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
          return isExternal ? (
            <a
              {...props}
              className={
                props.className
                  ? props.className
                  : 'group no-underline transition-colors duration-300 pb-0.5 border-b border-b-sky-300 hover:border-b-2 hover:border-b-sky-700 hover:text-sky-700'
              }
              rel="noopener noreferrer nofollow"
              target="_blank"
            >
              {props.children}
              <BsBoxArrowUpRight className="inline stroke-1 h-2.5 mb-1" />
            </a>
          ) : props.href.startsWith('/') ? (
            <Link
              {...props}
              className={
                props.className
                  ? props.className
                  : 'group no-underline transition-colors duration-300 pb-0.5 border-b border-b-sky-300 hover:border-b-2 hover:border-b-sky-700 hover:text-sky-700'
              }
              to={props.href}
            >
              {props.children}
            </Link>
          ) : (
            <a
              {...props}
              className={
                props.className
                  ? props.className
                  : 'group no-underline transition-colors duration-300 pb-0.5 border-b border-b-sky-300 hover:border-b-2 hover:border-b-sky-700 hover:text-sky-700'
              }
              to={props.href}
            >
              {props.children}
            </a>
          );
        },
        h1: (props) => <h1 {...props} className="whitespace-pre-wrap" />,
        h2: (props) => <h2 {...props} className="whitespace-pre-wrap" />,
        h3: (props) => <h3 {...props} className="whitespace-pre-wrap" />,
        h4: (props) => <h4 {...props} className="whitespace-pre-wrap" />,
        pre: (props) => {
          const language =
            props.children.props.className.replace(/language-/, '') || '';
          return (
            <Highlight
              Prism={Prism}
              code={props.children.props.children}
              language={language}
              theme={nightOwl}
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={'select-all ' + className} style={{ ...style }}>
                  {tokens.map((line, index) => {
                    const lineProps = getLineProps({ line, key: index });
                    return (
                      <div key={index} {...lineProps}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token, key })} />
                        ))}
                      </div>
                    );
                  })}
                </pre>
              )}
            </Highlight>
          );
        },
        strong: (props) => (
          <span {...props} className="font-medium px-0.5 py-1 bg-sky-100" />
        ),
      }}
    >
      <MDXRenderer>{body}</MDXRenderer>
    </MDXProvider>
  );
};

export default Markdown;
