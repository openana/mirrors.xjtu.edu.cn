import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { CloudIcon, Loader2Icon, SearchIcon } from 'lucide-react';

import { mirrorInfoMap } from './data';

interface MirrorStatus {
  name: string;
  status: string;
  last_update_ts: number;
}

export default function MirrorsLayout({
  isLoading,
  mirrors,
}: {
  isLoading: boolean;
  mirrors: MirrorStatus[];
}) {
  function getMirrorInfo(name: string) {
    if (!mirrorInfoMap.has(name))
      return <span className="font-medium text-gray-900">{name}</span>;
    const mirrorInfo = mirrorInfoMap.get(name);
    return (
      <div className="block w-full font-normal text-gray-400 truncate">
        <span className="font-medium text-gray-900">{mirrorInfo.name}</span>
        {mirrorInfo.help && (
          <span className="ml-2 bg-sky-100 text-sky-800 text-xs font-medium px-1.5 py-0.5 rounded-full border border-sky-200">
            ?
          </span>
        )}
        <span
          className="ml-2 text-xs font-normal text-gray-400"
          title={mirrorInfo.desc}
        >
          {mirrorInfo.desc}
        </span>
      </div>
    );
  }
  if (mirrors.length === 0) {
    mirrorInfoMap.forEach((mirrorInfo, name) => {
      mirrors.push({
        name,
        status: 'unknown',
        last_update_ts: -1,
      });
    });
  }
  return (
    <div className="py-6 basis-3/4">
      <div className="flex items-center justify-between pb-4 overflow-hidden">
        <div className="flex items-center">
          <div className="font-medium text-lg">
            <CloudIcon className="inline -mt-0.5" /> 镜像列表
          </div>
          <div className="flex ml-10 text-xs">
            <span>当前状态：</span>
            <span className="flex items-center text-green-500">
              正常运行
              <span className="relative flex h-2 w-2 ml-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </span>
            <span className="px-2">/</span>
            <span className="flex items-center text-yellow-500">
              服务降级
              <span className="relative flex h-2 w-2 ml-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
              </span>
            </span>
            <span className="px-2">/</span>
            <span className="flex items-center text-red-500">
              不可用
              <span className="relative flex h-2 w-2 ml-1">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            </span>
            <span className="px-2">/</span>
            <span className="flex items-center text-gray-500">
              未知
              <span className="relative flex h-2 w-2 ml-1">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-500"></span>
              </span>
            </span>
          </div>
        </div>
        <label htmlFor="table-filter" className="sr-only">
          Filter
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-xs font-semibold space-x-1">
            <kbd className="px-1 py-0.5 text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
              Ctrl
            </kbd>
            <span>+</span>
            <kbd className="px-1 py-0.5 text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
              F
            </kbd>
          </span>
          <input
            type="text"
            id="table-filter"
            className="block p-2 pl-8 pr-24 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-sky-500 focus:border-sky-500"
            placeholder="查找镜像"
          />
        </div>
      </div>
      <table className="relative table-fixed w-full text-sm text-left text-gray-500 rounded-md overflow-hidden dark:text-gray-400">
        <thead className="text-xs text-sky-700 uppercase bg-gray-50 dark:bg-sky-700 dark:text-sky-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3 w-1/4">
              Last Update
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading && false && (
            <tr className="bg-white border-t dark:bg-gray-800 dark:border-gray-700">
              <td
                colSpan={2}
                className="px-6 py-2 text-sky-900 dark:text-white"
              >
                Loading...
              </td>
            </tr>
          )}
          {mirrors.length === 0 ? (
            <tr className="bg-white border-t dark:bg-gray-800 dark:border-gray-700">
              <td
                colSpan={2}
                className="px-6 py-2 text-gray-900 dark:text-white"
              >
                No mirrors found
              </td>
            </tr>
          ) : (
            mirrors
              .filter((mirror) => mirror.status !== 'disabled')
              .sort((a, b) =>
                a.name.localeCompare(b.name, undefined, {
                  sensitivity: 'base',
                }),
              )
              // .sort((a, b) => {
              //   if (a.status === 'git' && b.status !== 'git') return 1
              //   if (a.status !== 'git' && b.status === 'git') return -1
              //   return 0
              // })
              // .sort((a, b) => {
              //   if (a.status === 'proxy' && b.status !== 'proxy') return 1
              //   if (a.status !== 'proxy' && b.status === 'proxy') return -1
              //   return 0
              // })
              .map((mirror, key) => (
                <tr
                  key={key}
                  className={
                    `border-t transition-colors animate-fade-in ` +
                    (mirror.status === 'success'
                      ? 'bg-white hover:bg-gray-50'
                      : mirror.status === 'failed'
                      ? 'bg-orange-50 hover:bg-orange-100'
                      : mirror.status === 'syncing' ||
                        mirror.status === 'pre-syncing'
                      ? 'bg-sky-50 hover:bg-sky-100'
                      : 'bg-white hover:bg-gray-50')
                  }
                >
                  <td className="px-6 py-2">{getMirrorInfo(mirror.name)}</td>
                  <td className="px-6 py-2">
                    {mirror.status === 'unknown'
                      ? ''
                      : mirror.status === 'git'
                      ? 'Git 镜像'
                      : mirror.status === 'proxy'
                      ? '代理访问'
                      : mirror.status === 'mirrorz'
                      ? 'MirrorZ.org'
                      : mirror.last_update_ts < 0
                      ? '正在初始化'
                      : formatDistanceToNow(mirror.last_update_ts * 1000, {
                          locale: zhCN,
                        }) + '前'}
                    {mirror.status === 'git' || mirror.status === 'proxy' ? (
                      <span className="bg-green-100 text-green-800 text-xs font-medium ml-2 px-2.5 py-0.5 rounded border border-green-200">
                        可用
                      </span>
                    ) : mirror.status === 'failed' ? (
                      <span className="bg-red-100 text-red-800 text-xs font-medium ml-2 px-2.5 py-0.5 rounded border border-red-200">
                        失败
                      </span>
                    ) : mirror.status === 'syncing' ||
                      mirror.status === 'pre-syncing' ? (
                      <>
                        <span className="bg-sky-100 text-sky-800 text-xs font-medium ml-2 px-2.5 py-0.5 rounded border border-sky-200">
                          同步中
                        </span>
                        <Loader2Icon className="ml-1 w-4 h-4 inline-block text-sky-600 animate-spin" />
                      </>
                    ) : (
                      ''
                    )}
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>
    </div>
  );
}
