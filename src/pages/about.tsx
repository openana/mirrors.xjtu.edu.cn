import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { BsArrowBarUp, BsPencilSquare } from 'react-icons/bs';

import { Aside } from '../components/docs/aside';
import { ToC } from '../components/docs/toc';
import { Markdown } from '../components/markdown';
import { IMdxData } from '../components/markdown/types';

const ExternalLink: React.FC<{ href: string; title: any }> = ({
  href,
  title,
}) => {
  return (
    <a
      className="transition-colors duration-300 hover:text-slate-900"
      href={href}
      rel="noopener noreferrer nofollow"
      target="_blank"
    >
      {title}
    </a>
  );
};

const AboutPage = () => {
  const data: IMdxData = useStaticQuery(graphql`
    query aboutMdxQuery {
      mdx(slug: { eq: "about" }) {
        frontmatter {
          title
          description
        }
        body
        slug
        excerpt(pruneLength: 100, truncate: true)
        tableOfContents
      }
    }
  `);

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="grid grid-cols-5 gap-10 py-10">
        <div className="col-span-1">
          <Aside />
        </div>
        <div className="col-span-4">
          <div className="grid grid-cols-4 gap-10">
            <div className="col-span-3">
              <div>
                <div>
                  <h1 className="inline-block text-4xl font-light text-slate-900 tracking-tight">
                    {data.mdx.frontmatter.title}
                  </h1>
                </div>
                <p className="mt-2 text-lg text-slate-700">
                  {data.mdx.frontmatter.description}
                </p>
              </div>
              <div className="prose prose-sky mt-8">
                <Markdown body={data.mdx.body} />
              </div>
              <div className="text-sm leading-6 mt-12">
                <div className="flex text-slate-500">
                  <div className="ml-auto">
                    <a
                      className="transition-colors duration-300 hover:text-slate-900"
                      href="#top"
                    >
                      回到页面顶端{' '}
                      <BsArrowBarUp className="inline h-4 mb-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <ToC tableOfContents={data.mdx.tableOfContents} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
