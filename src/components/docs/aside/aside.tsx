import * as React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';

interface IDocumentationYamlQuery {
  contentYaml: {
    data: {
      items: {
        title: string;
        to: string;
      }[];
      title: string;
    }[];
  };
}

const Aside = () => {
  const data: IDocumentationYamlQuery = useStaticQuery(graphql`
    query documentationYamlQuery {
      contentYaml(yamlId: { base: { eq: "documentation.yaml" } }) {
        data {
          items {
            title
            to
          }
          title
        }
      }
    }
  `);

  return (
    <ul>
      <li>
        <span className="group flex items-center text-sm leading-6 mb-4 font-medium text-slate-700 hover:text-slate-900">
          <span className="mr-4 h-6 w-6 rounded border group-hover:border-slate-500"></span>
          网络信息中心
        </span>
      </li>
      <li>
        <span className="group flex items-center text-sm leading-6 mb-4 font-medium text-slate-700 hover:text-slate-900">
          <span className="mr-4 h-6 w-6 rounded border group-hover:border-slate-500"></span>
          西交网管会
        </span>
      </li>
      {data.contentYaml.data.map(({ title, items }, key) => (
        <li className="mt-8" key={key}>
          <h5 className="mb-8 lg:mb-3 font-semibold text-slate-900">{title}</h5>
          <ul className="space-y-6 lg:space-y-2 border-l border-slate-100">
            {items.map(({ title, to }, key) => (
              <li
                className="block border-l pl-4 -ml-px border-transparent hover:border-slate-400 text-slate-700 hover:text-slate-900"
                key={key}
              >
                <Link to={to}>{title}</Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default Aside;
