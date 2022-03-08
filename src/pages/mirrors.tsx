import * as React from 'react';
import { Link } from 'gatsby';

import {
  BsCloudFill,
  BsClockHistory,
  BsGithub,
  BsHddNetworkFill,
  BsInfoCircleFill,
  BsSortAlphaDown,
} from 'react-icons/bs';

type mirrorsType = {
  version: number;
  data: {
    id: string;
    name: string;
    type?: string;
    desc?: string;
    docs?: string;
  }[];
};

const mirrors: mirrorsType = require('../../content/mirrors.yaml');

const MirrorsPage = () => {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
      <table className="flex flex-col text-sm">
        <thead className="flex flex-col border-b font-medium text-slate-600">
          <tr className="flex p-2 space-x-2">
            <th className="flex-none w-4 text-left">
              <BsCloudFill className="inline text-base h-4 pb-0.5" />
            </th>
            <th className="flex-none basis-1/4 text-left">
              名称
              <BsSortAlphaDown className="inline text-base h-4 pb-0.5" />
            </th>
            <th className="flex-auto overflow-hidden text-left">介绍</th>
            <th className="flex-none w-48 text-right">同步状态</th>
          </tr>
        </thead>
        <tbody className="flex flex-col text-slate-600">
          {mirrors.data.map(({ id, type, name, desc, docs }) => (
            <tr className="flex px-2 py-1 space-x-2 transition-colors duration-200 hover:bg-slate-100">
              <td className="flex-none w-4">
                {id ? (
                  type === 'git' ? (
                    <BsGithub className="inline text-base h-4 pb-0.5" />
                  ) : (
                    <BsClockHistory className="inline text-base h-4 pb-0.5" />
                  )
                ) : (
                  <BsHddNetworkFill className="inline text-base h-4 pb-0.5" />
                )}
              </td>
              <td className="flex-none basis-1/4 overflow-hidden">
                <p className="truncate" title={desc}>
                  {id ? (
                    <Link
                      className="transition-colors duration-500 text-sky-600 hover:text-sky-800"
                      to={`${id}/#page=1`}
                    >
                      {name}
                    </Link>
                  ) : (
                    name
                  )}{' '}
                  {docs && (
                    <Link
                      className="transition-colors duration-500 text-sky-600 hover:text-sky-800"
                      to={`${docs}/#skip`}
                    >
                      <BsInfoCircleFill className="inline text-base h-4 pb-0.5" />
                    </Link>
                  )}
                </p>
              </td>
              <td className="flex-auto overflow-hidden">
                <p className="truncate hover:whitespace-normal">{desc}</p>
              </td>
              <td className="flex-none w-48 text-right">D</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MirrorsPage;
