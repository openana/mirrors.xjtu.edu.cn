'use client';

import Link from 'next/link';
import { Loader2Icon, HelpCircleIcon } from 'lucide-react';
import { formatDistanceToNow, getTime } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { allDocsPosts } from 'contentlayer/generated';

import { MirrorConfig, mirrorConfigs } from '@/config/mirrors';

type MirrorStatus = {
  name: string;
  status: string;
  last_update_ts: number;
  last_ended_ts: number;
  next_schedue_ts: number;
  size: string;
  upstream: string;
};

type MirrorsTableProps = {
  isLoading: boolean;
  mirrors: MirrorStatus[];
};

function getMirrorInfo(config: MirrorConfig) {
  return (
    <div className="flex items-center w-full font-normal">
      <div className="whitespace-nowrap font-medium text-sky-900">
        <span>{config.status?.name}</span>
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
  function getTimeInfo(status: string, ts: number) {
    switch (status) {
      case 'unknown':
        return '';
      case 'git':
        return 'Git 镜像';
      case 'proxy':
        return '代理访问';
      case 'mirrorz':
        return '由 MirrorZ.org 提供';
      default:
        if (ts < 0) return '正在初始化';
        return formatDistanceToNow(ts * 1000, {
          locale: zhCN,
          addSuffix: true,
        });
    }
  }
  function getStatusInfo(item: MirrorStatus) {
    switch (item.status) {
      case 'git':
      case 'proxy':
        return (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded border border-green-200">
            可用
          </span>
        );
      case 'failed':
        return (
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded border border-red-200">
            失败
          </span>
        );
      case 'pre-syncing':
        return (
          <span className="bg-sky-100 text-sky-800 text-xs font-medium px-2.5 py-0.5 rounded border border-sky-200">
            预同步
          </span>
        );
      case 'syncing':
        return (
          <span className="bg-sky-100 text-sky-800 text-xs font-medium px-2.5 py-0.5 rounded border border-sky-200">
            同步中
          </span>
        );
      case 'success':
        return (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded border border-green-200">
            成功
          </span>
        );
      case 'paused':
        return (
          <span className="bg-neutral-100 text-neutral-800 text-xs font-medium px-2.5 py-0.5 rounded border border-neutral-200">
            暂停
          </span>
        );
    }
  }
  const status = config.status;
  console.log(status);
  const size = status?.size;
  return (
    <tr className={getClass(config.status?.status)}>
      <td className="px-2 py-1.5">{getMirrorInfo(config)}</td>
      <td className="px-2 py-1.5">
        {getTimeInfo(status?.status, status?.last_update_ts)}
      </td>
      <td className="px-2 py-1.5">
        {getTimeInfo(status?.status, status?.next_schedule_ts)}
      </td>
      <td className="px-2 py-1.5">
        {getTimeInfo(status?.status, status?.last_ended_ts)}
      </td>
      <td className="px-2 py-1.5">{status?.upstream}</td>
      <td className="px-2 py-1.5">
        <span className="hidden md:inline">{getStatusInfo(status)}</span>
        {status?.status === 'syncing' && (
          <span>
            <Loader2Icon className="inline-block w-4 h-4 ml-2 -mt-0.5 text-sky-600 animate-spin" />
          </span>
        )}
      </td>
      <td className="px-2 py-1.5 text-end">
        {size === 'unknown' ? '未知' : size?.replace(/(\d+)([GMK])/, '$1 $2B')}
      </td>
    </tr>
  );
}

export function StatusTable(props: MirrorsTableProps) {
  if (props.mirrors.length === 0) {
    mirrorConfigs.forEach((item) => {
      if (item.status !== undefined) return;
      item.status = {
        name: item.alias[0],
        status: 'unknown',
        last_ended_ts: -1,
        last_update_ts: -1,
        last_schedule_ts: -1,
      };
    });
  } else {
    mirrorConfigs.forEach((item) => {
      const status = props.mirrors.find((i) => item.alias.includes(i.name));
      if (status) item.status = status;
    });
  }
  const mirrors = mirrorConfigs
    .filter(
      (item) => item.status !== undefined && item.status.status !== 'disabled',
    )
    .filter((item) => {
      if (item.status?.status === 'mirrorz') {
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
          <th scope="col" className="px-2 py-2 w-48">
            Name
          </th>
          <th scope="col" className="px-2 py-2 w-32">
            Last Update
          </th>
          <th scope="col" className="px-2 py-2 w-32">
            Next Schedule
          </th>
          <th scope="col" className="px-2 py-2 w-32">
            Last Ended
          </th>
          <th scope="col" className="px-2 py-2 w-96">
            Upstream
          </th>
          <th scope="col" className="px-2 py-2 w-24">
            Status
          </th>
          <th scope="col" className="px-2 py-2 w-24 text-end">
            Size
          </th>
        </tr>
      </thead>
      <tbody>
        {props.isLoading && false && (
          <tr className="bg-white border-t dark:bg-gray-800 dark:border-gray-700">
            <td
              colSpan={2}
              className="px-2 py-1.5 text-sky-900 dark:text-white"
            >
              正在加载...
            </td>
          </tr>
        )}
        {mirrors.length === 0 ? (
          <tr className="bg-white border-t dark:bg-gray-800 dark:border-gray-700">
            <td
              colSpan={2}
              className="px-2 py-1.5 text-gray-900 dark:text-white"
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
