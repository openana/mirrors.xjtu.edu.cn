import * as React from 'react';
import { Link } from 'gatsby';

import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

import {
  BsArrowRepeat,
  BsCloudCheckFill,
  BsCloudSlashFill,
  BsClockHistory,
  BsGithub,
  BsHddNetworkFill,
  BsInfoCircleFill,
} from 'react-icons/bs';

import { IMirrorsData } from './types';

const text = `# Hello, world!

Here's a color picker!
`;

const MirrorsTableRow: React.FC<{ item: IMirrorsData }> = ({ item }) => {
  const { id, type, name, desc, docs, tags, status, success_at } = item;
  return (
    <tr
      className={`flex px-2 py-1 space-x-2 transition-colors duration-200${
        status === 'mirrorz'
          ? ' bg-purple-100 hover:bg-purple-200'
          : status === 'syncing'
          ? ' bg-sky-100 hover:bg-sky-200'
          : status === 'failed'
          ? ' bg-orange-100 hover:bg-orange-200'
          : ' hover:bg-slate-100'
      }`}
    >
      <td className="flex-none w-4">
        {id ? (
          type === 'git' ? (
            <BsGithub className="inline text-base h-4 mb-0.5" />
          ) : status === 'success' ? (
            <BsCloudCheckFill className="inline text-base h-4 mb-0.5" />
          ) : status === 'syncing' ? (
            <BsArrowRepeat className="inline text-base h-4 mb-0.5 animate-spin" />
          ) : status === 'failed' ? (
            <BsCloudSlashFill className="inline text-base h-4 mb-0.5" />
          ) : (
            <BsClockHistory className="inline text-base h-4 mb-0.5" />
          )
        ) : (
          <BsHddNetworkFill className="inline text-base h-4 mb-0.5" />
        )}
      </td>
      <td className="flex-none basis-1/5 overflow-hidden">
        <p
          className="truncate"
          title={desc && desc.replace(/(<([^>]+)>)/gi, '')}
        >
          {id ? (
            <Link
              className="transition-colors duration-500 text-sky-600 hover:text-sky-800"
              to={`/mirrors/${id}/#cache`}
            >
              {name}
            </Link>
          ) : (
            name
          )}{' '}
          {docs && (
            <Link
              className="transition-colors duration-500 text-sky-600 hover:text-sky-800"
              to={docs}
            >
              <BsInfoCircleFill className="inline text-base h-4 mb-0.5" />
            </Link>
          )}
        </p>
      </td>
      <td className="flex-auto overflow-hidden">
        <p className="truncate hover:whitespace-normal">
          {tags &&
            tags.map((tag, key) => (
              <div
                key={key}
                className={`inline mr-2 px-1 py-0.5 text-xs uppercase rounded-md${
                  tag === 'deprecated' ? ' bg-yellow-300' : ' bg-purple-300'
                }`}
              >
                {tag}
              </div>
            ))}
          {desc && (
            <div
              className="mirrors-desc inline"
              dangerouslySetInnerHTML={{ __html: desc }}
            ></div>
          )}
          <div className="italic" />
        </p>
      </td>
      <td className="flex-none w-32 text-right">
        {success_at &&
          formatDistanceToNow(success_at, {
            addSuffix: true,
            locale: zhCN,
          })}
      </td>
    </tr>
  );
};

export default MirrorsTableRow;
