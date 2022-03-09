import * as React from 'react';
import { graphql, useStaticQuery, Link, PageProps } from 'gatsby';

import { BsChatText, BsCompass, BsDisc, BsNewspaper } from 'react-icons/bs';

import { FilesTable, MirrorsTable } from '../../components/mirrors/table';
import { IMirrors } from '../../components/mirrors/table/types';

const MirrorsPage: React.FC<PageProps> = ({ location }, props) => {
  const data = useStaticQuery(graphql`
    query mirrorsYamlQuery {
      contentYaml(yamlId: { eq: "content/mirrors.yaml" }) {
        data {
          alts
          desc
          id
          docs
          name
          status
          tags
          type
        }
      }
    }
  `);

  const [mirrors, setMirrors] = React.useState<IMirrors>({
    data: data.contentYaml.data,
    error: null,
  });

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="grid grid-cols-4 gap-4 py-10">
        <div className="col-span-3">
          <div className="mb-4">
            <label className="relative block">
              <span className="sr-only">Search</span>
              <span className="absolute inset-y-0 left-0 flex items-center pl-2"></span>
              <input
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Search for anything..."
                type="text"
                name="search"
              />
            </label>
          </div>
          <div className="mb-4">
            {location.pathname.replace(/^(\/mirrors\.xjtu\.edu\.cn)/, '') === '/mirrors/' ? (
              <MirrorsTable mirrors={mirrors} setMirrors={setMirrors} />
            ) : (
              <FilesTable location={location} {...props} />
            )}
          </div>
        </div>
        <div className="col-span-1">
          <ul>
            <li>
              <h4 className="mb-3 text-slate-900 text-xl font-medium">
                <BsNewspaper className="inline text-2xl mb-1" />
                <span className="ml-2">新闻通知</span>
              </h4>
              <ul className="space-y-1 ml-2 text-slate-700">
                {[
                  {
                    name: 'PLACEHOLDER',
                    time: '202X年3月9日',
                    to: '#PLACEHOLDER"',
                  },
                  {
                    name: 'PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER',
                    time: '202X年3月9日',
                    to: '#PLACEHOLDER"',
                  },
                  {
                    name: 'PLACEHOLDER',
                    time: '202X年3月9日',
                    to: '#PLACEHOLDER"',
                  },
                  {
                    name: 'PLACEHOLDER',
                    time: '202X年3月9日',
                    to: '#PLACEHOLDER"',
                  },
                ].map(({ name, time, to }, key) => (
                  <li key={key}>
                    <Link
                      className="block px-2 py-1 rounded-md transition-colors duration-500 hover:bg-slate-100 hover:text-slate-900"
                      to={to}
                    >
                      <p className="truncate">{name}</p>
                      <p className="text-xs text-slate-500">{time}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="mt-6">
              <h4 className="mb-3 text-slate-900 text-xl font-medium">
                <BsDisc className="inline text-2xl mb-1" />
                <span className="ml-2">资源下载</span>
              </h4>
            </li>
            <li className="mt-6">
              <h4 className="mb-3 text-slate-900 text-xl font-medium">
                <BsChatText className="inline text-2xl mb-1" />
                <span className="ml-2">联系我们</span>
              </h4>
            </li>
            <li className="mt-6">
              <h4 className="mb-3 text-slate-900 text-xl font-medium">
                <BsCompass className="inline text-2xl mb-1" />
                <span className="ml-2">相关链接</span>
              </h4>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MirrorsPage;
