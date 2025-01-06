'use client';

import Link from 'next/link';
import { Loader2Icon, HelpCircleIcon, GitForkIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { allDocsPosts } from 'contentlayer/generated';

import { MirrorConfig, mirrorConfigs } from '@/config/mirrors';

type MirrorStatus = {
  name: string;
  status: string;
  last_update_ts: number;
};

type MirrorsTableProps = {
  isLoading: boolean;
  mirrors: MirrorStatus[];
  filter: any;
};

function getMirrorInfo(config: MirrorConfig) {
  const name = config.status?.name;
  const mirrorGit = config.title.endsWith('.git');
  const mirrorHelp = allDocsPosts.find((item) => item.alias?.includes(name));
  return (
    <div className="flex items-center w-full font-normal">
      {config.display_only ? (
        <div className="whitespace-nowrap font-medium text-sky-900">
          <span>{config.title}</span>
        </div>
      ) : (
        <div className="whitespace-nowrap font-medium text-sky-700 hover:underline hover:text-sky-900 transition-colors">
          <Link
            href={`/?mirrors=${encodeURIComponent(name + '/')}`}
            prefetch={false}
          >
            {config.title}
          </Link>
        </div>
      )}
      {mirrorGit && (
        <span>
          <GitForkIcon className="inline-block w-4 h-4 ml-1 -mt-0.5 text-sky-700 hover:text-sky-900 transition-colors" />
        </span>
      )}
      {mirrorHelp && (
        <Link
          href={`/docs/${mirrorHelp.slug}/`}
          aria-label={`Help for ${name}`}
        >
          <HelpCircleIcon className="inline-block w-4 h-4 ml-1 -mt-0.5 text-sky-700 hover:text-sky-900 transition-colors" />
        </Link>
      )}
      <div className="ml-1 truncate text-xs font-normal text-gray-500 hidden md:inline">
        {config.desc}
      </div>
    </div>
  );
}

function TableRow(config: MirrorConfig) {
  function getClass(status: string) {
    const _class = 'border-t transition-colors animate-fade-in ';
    switch (status) {
      case 'mirrorz':
        return _class + 'bg-green-50 hover:bg-green-100';
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
      case 'proxy':
        return '代理访问';
      case 'mirrorz':
        return '由 MirrorZ.org 提供';
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
      case 'paused':
        return (
          <span className="bg-neutral-100 text-neutral-800 text-xs font-medium ml-2 px-2.5 py-0.5 rounded border border-neutral-200">
            暂停
          </span>
        );
    }
  }
  return (
    <tr className={getClass(config.status?.status)}>
      <td className="px-4 py-2 md:px-6">{getMirrorInfo(config)}</td>
      <td className="px-4 py-2 md:px-6">
        <span>{getUpdateInfo(config.status)}</span>
        <span className="hidden md:inline">{getStatusInfo(config.status)}</span>
        {config.status?.status === 'syncing' && (
          <span>
            <Loader2Icon className="inline-block w-4 h-4 ml-2 -mt-0.5 text-sky-600 animate-spin" />
          </span>
        )}
      </td>
    </tr>
  );
}

export function MirrorsTable(props: MirrorsTableProps) {
  if (props.mirrors.length === 0) {
    mirrorConfigs.forEach((item) => {
      if (item.status !== undefined) return;
      item.status = {
        name: item.alias[0],
        status: 'unknown',
        last_update_ts: -1,
      };
    });
  } else {
    mirrorConfigs.forEach((item) => {
      const status = props.mirrors.find((i) => item.alias.includes(i.name));
      if (status) item.status = status;
    });
    // add mirrors not in mirrorConfigs
    props.mirrors
      .filter(
        (item) =>
          !mirrorConfigs.find((i) => i.alias.includes(item.name)) &&
          item.status !== undefined,
      )
      .forEach((item) => {
        let config: MirrorConfig = {
          alias: [item.name],
          title: item.name,
          status: item,
          display_only: true,
        };
        if (item.name.endsWith('.git')) {
          config.title = 'git/' + item.name;
          config.desc = 'Git 镜像';
          config.alias.push(config.title);
        }
        mirrorConfigs.push(config);
      });
  }
  const mirrors = mirrorConfigs
    .filter(
      (item) => item.status !== undefined && item.status.status !== 'disabled',
    )
    .filter((item) => {
      if (
        props.filter.name !== '' &&
        !item.title.toLowerCase().includes(props.filter.name.toLowerCase())
      ) {
        return false;
      }
      if (!props.filter.showGit && item.title.endsWith('.git')) {
        return false;
      }
      if (!props.filter.showProxy && item.status?.status === 'proxy') {
        return false;
      }
      if (!props.filter.showMirrorZ && item.status?.status === 'mirrorz') {
        return false;
      }
      return true;
    })
    .sort((a, b) =>
      a.title.localeCompare(b.title, undefined, {
        sensitivity: 'base',
      }),
    );
  return (
    <table className="relative table-fixed w-full text-sm text-left text-gray-500 rounded-md overflow-hidden dark:text-gray-400">
      <thead className="text-xs text-sky-700 uppercase bg-gray-50 dark:bg-sky-700 dark:text-sky-400">
        <tr>
          <th scope="col" className="px-4 md:px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-4 md:px-6 py-3 w-40 md:w-60">
            Last Update
          </th>
        </tr>
      </thead>
      <tbody>
        {props.isLoading && false && (
          <tr className="bg-white border-t dark:bg-gray-800 dark:border-gray-700">
            <td
              colSpan={2}
              className="px-4 md:px-6 py-2 text-sky-900 dark:text-white"
            >
              正在加载...
            </td>
          </tr>
        )}
        {mirrors.length === 0 ? (
          <tr className="bg-white border-t dark:bg-gray-800 dark:border-gray-700">
            <td
              colSpan={2}
              className="px-4 md:px-6 py-2 text-gray-900 dark:text-white"
            >
              未找到镜像
            </td>
          </tr>
        ) : (
          mirrors.map((item, key) => <TableRow key={key} {...item} />)
        )}
      </tbody>
    </table>
  );
}
