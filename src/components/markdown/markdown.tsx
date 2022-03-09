import * as React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';

const Markdown: React.FC<{ body: any }> = ({ body }) => {
  return (
    <MDXProvider
      components={{
        a: (props) => (
          <a
            {...props}
            className={
              props.className
                ? props.className
                : 'underline-offset-2 transition-colors duration-500 decoration-sky-300 hover:decoration-sky-700'
            }
          />
        ),
        h1: ({ children, id }, ...props) => (
          <div {...props} id={id} className="whitespace-pre-wrap -mt-20 pt-20">
            <h1 children={children} />
          </div>
        ),
        h2: ({ children, id }, ...props) => (
          <div {...props} id={id} className="-mt-20 pt-20">
            <h2 children={children} className="whitespace-pre-wrap mt-0" />
          </div>
        ),
        h3: ({ children }, ...props) => (
          <div {...props} className="-mt-20 pt-20">
            <h3 children={children} className="whitespace-pre-wrap mt-0" />
          </div>
        ),
        h4: ({ children }, ...props) => (
          <div {...props} className="whitespace-pre-wrap -mt-20 pt-20">
            <h4 children={children} />
          </div>
        ),
      }}
    >
      <MDXRenderer>{body}</MDXRenderer>
    </MDXProvider>
  );
};

export default Markdown;
