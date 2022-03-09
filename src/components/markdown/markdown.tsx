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
