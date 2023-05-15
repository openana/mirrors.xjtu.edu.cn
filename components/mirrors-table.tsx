'use client';

import Link from 'next/link';
import { Loader2Icon, HelpCircleIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { allDocsPosts } from 'contentlayer/generated';

import { mirrorConfigs } from '@/config/mirrors';

type MirrorStatus = {
  name: string;
  status: string;
  last_update_ts: number;
};

type MirrorsTableProps = {
  isLoading: boolean;
  mirrors: MirrorStatus[];
};

function getMirrorInfo(name: string) {
  const mirrorConfig = mirrorConfigs.find((item) => item.alias.includes(name));
  const mirrorHelp = allDocsPosts.find((item) => item.alias?.includes(name));
  if (!mirrorConfig) {
    return <span className="font-medium text-gray-900">{name}</span>;
  }
  return (
    <div className="flex items-center w-full font-normal text-gray-400">
      <div className="whitespace-nowrap font-medium text-sky-700 hover:underline hover:text-sky-900 transition-colors">
        <Link href={`/?mirrors=${name}/`}>{mirrorConfig.title}</Link>
      </div>
      {mirrorHelp && (
        <Link href={`/docs/${mirrorHelp.slug}/`}>
          <HelpCircleIcon className="inline-block w-4 h-4 ml-1 -mt-0.5 text-sky-700 hover:text-sky-900 transition-colors" />
        </Link>
      )}
      <div className="ml-1 truncate text-xs font-normal text-gray-400 hidden md:inline">
        {mirrorConfig.desc}
      </div>
    </div>
  );
}

function TableRow(item: MirrorStatus) {
  function getClass(status: string) {
    const _class = 'border-t transition-colors animate-fade-in ';
    switch (status) {
      case 'failed':
        return _class + 'bg-orange-50 hover:bg-orange-100';
      case 'syncing':
      case 'pre-syncing':
        return _class + 'bg-sky-50 hover:bg-sky-100';
      default:
        return _class + 'bg-white hover:bg-gray-50';
    }
  }
  function getUpdateInfo(item: MirrorStatus) {
    switch (item.status) {
      case 'unknown':
        return '';
      case 'git':
        return 'Git 镜像';
      case 'proxy':
        return '代理访问';
      case 'mirrorz':
        return 'MirrorZ.org';
      default:
        if (item.last_update_ts < 0) return '正在初始化';
        return (
          formatDistanceToNow(item.last_update_ts * 1000, {
            locale: zhCN,
          }) + '前'
        );
    }
  }
  function getStatusInfo(item: MirrorStatus) {
    switch (item.status) {
      case 'git':
      case 'proxy':
        return (
          <span className="bg-green-100 text-green-800 text-xs font-medium ml-2 px-2.5 py-0.5 rounded border border-green-200">
            可用
          </span>
        );
      case 'failed':
        return (
          <span className="bg-red-100 text-red-800 text-xs font-medium ml-2 px-2.5 py-0.5 rounded border border-red-200">
            失败
          </span>
        );
      case 'pre-syncing':
        return (
          <span className="bg-sky-100 text-sky-800 text-xs font-medium ml-2 px-2.5 py-0.5 rounded border border-sky-200">
            预同步
          </span>
        );
      case 'syncing':
        return (
          <span className="bg-sky-100 text-sky-800 text-xs font-medium ml-2 px-2.5 py-0.5 rounded border border-sky-200">
            同步中
          </span>
        );
    }
  }
  return (
    <tr className={getClass(item.status)}>
      <td className="px-6 py-2">{getMirrorInfo(item.name)}</td>
      <td className="px-6 py-2">
        <span>{getUpdateInfo(item)}</span>
        <span className="hidden md:inline">{getStatusInfo(item)}</span>
        {item.status === 'syncing' && (
          <span>
            <Loader2Icon className="ml-1 w-4 h-4 inline-block text-sky-600 animate-spin" />
          </span>
        )}
      </td>
    </tr>
  );
}

export function MirrorsTable(props: MirrorsTableProps) {
  if (props.mirrors.length === 0) {
    mirrorConfigs.forEach((item) => {
      props.mirrors.push({
        name: item.alias[0],
        status: 'unknown',
        last_update_ts: -1,
      });
    });
  }
  return (
    <table className="relative table-fixed w-full text-sm text-left text-gray-500 rounded-md overflow-hidden dark:text-gray-400">
      <thead className="text-xs text-sky-700 uppercase bg-gray-50 dark:bg-sky-700 dark:text-sky-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3 w-40 md:w-56">
            Last Update
          </th>
        </tr>
      </thead>
      <tbody>
        {props.isLoading && false && (
          <tr className="bg-white border-t dark:bg-gray-800 dark:border-gray-700">
            <td colSpan={2} className="px-6 py-2 text-sky-900 dark:text-white">
              Loading...
            </td>
          </tr>
        )}
        {props.mirrors.length === 0 ? (
          <tr className="bg-white border-t dark:bg-gray-800 dark:border-gray-700">
            <td colSpan={2} className="px-6 py-2 text-gray-900 dark:text-white">
              No mirrors found
            </td>
          </tr>
        ) : (
          props.mirrors
            .filter((item) => item.status !== 'disabled')
            .sort((a, b) =>
              a.name.localeCompare(b.name, undefined, {
                sensitivity: 'base',
              }),
            )
            .map((item, key) => <TableRow key={key} {...item} />)
        )}
      </tbody>
    </table>
  );
}
