import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { BsArrowBarUp } from 'react-icons/bs';

import { Markdown } from '../components/markdown';
import { IMdxData } from '../components/markdown/types';

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
      <div className="grid grid-cols-4 gap-4 py-10">
        <div className="col-span-1"></div>
        <div className="col-span-3">
          <div className="grid grid-cols-4 gap-4">
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
                <div className="flex justify-between text-slate-500">
                  <div>
                    <a className="hover:text-slate-900" href="#top">
                      回到页面顶端 <BsArrowBarUp className="inline" />
                    </a>
                  </div>
                  <div>
                    <a
                      className="hover:text-slate-900"
                      href={`https://github.com/openana/mirrors.xjtu.edu.cn/edit/master/content/${data.mdx.slug}.mdx`}
                    >
                      在 GitHub 上编辑此页
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="fixed">
                <h5 className="text-slate-900 font-semibold mb-4 text-sm leading-6">
                  目录
                </h5>
                <ul className="text-slate-700 text-sm leading-6">
                  {data.mdx.tableOfContents.items?.map(
                    ({ url, title }, key) => (
                      <li key={key}>
                        <a
                          href={url}
                          className="block py-1 font-medium hover:text-slate-900"
                        >
                          {title}
                        </a>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
