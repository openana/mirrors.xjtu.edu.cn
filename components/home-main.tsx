'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CloudIcon, CommandIcon, HomeIcon, SearchIcon } from 'lucide-react';
import { Breadcrumb, Checkbox } from 'flowbite-react';

import useSWR, { SWRConfig, useSWRConfig } from 'swr';

import { FilesTable } from '@/components/files-table';
import { MirrorsTable } from '@/components/mirrors-table';
import { mirrorConfigs } from '@/config/mirrors';
import { type MirrorConfig } from '@/config/mirrors';
import path from 'path';

type MirrorsProps = {
  filter: Filter;
};

function Mirrors(props: MirrorsProps) {
  const [mirrors, setMirrors] = useState<any[]>([]);
  const [counter, setCounter] = useState(true);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/mirrors.json')
      .then((res) => res.json())
      .then((data) => {
        setMirrors(data);
        setLoading(false);
      });
    const interval = setInterval(() => {
      setCounter(!counter);
    }, 30000);
    return () => clearInterval(interval);
  }, [counter]);

  return (
    <MirrorsTable
      isLoading={isLoading}
      mirrors={mirrors}
      filter={props.filter}
    />
  );
}

type FilesProps = {
  mirrorsPath: string;
  mirrorConfig: MirrorConfig;
  filter: Filter;
  searchDownload?: string;
};

const localStorageProvider = () => {
  if (typeof window === 'undefined') {
    return new Map();
  }

  // When initializing, we restore the data from `localStorage` into a map.
  const map = new Map<any, any>(
    JSON.parse(localStorage.getItem('app-cache') || '[]'),
  );

  // Before unloading the app, we write back all the data into `localStorage`.
  window.addEventListener('beforeunload', () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem('app-cache', appCache);
  });

  // We still use the map for write & read for performance.
  return map;
};

type File = {
  name: string;
  type: string;
  mtime: string;
  size?: number;
};

const sizeToTGMKByte = (bytes: number) => {
  if (bytes === 0) return '0 B';
  let k = 1024,
    sizes = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

function Files(props: FilesProps) {
  const { cache, mutate, ...extraConfig } = useSWRConfig();

  const fetcher = async (url: string) => {
    const cachedData = cache.get(url);
    if (cachedData?.data && !cachedData.isLoading) {
      return cachedData.data;
    }

    const res = await fetch(url, { redirect: 'follow' });

    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
      const error = {
        message: `An error occurred while fetching the data.`,
        info: await res.json(),
        status: res.status,
      };
      throw error;
    }

    return res.json();
  };

  const { data, error } = useSWR('/api/mirrors/' + props.mirrorsPath, fetcher);
  const files = data;
  const isLoading = !error && !data;

  const parts = props.mirrorsPath.split('/').filter((part) => part !== '');
  const BreadcrumbItems = () => {
    const items = [];
    items.push(
      <li key={-1} className="inline-flex items-center">
        <Link
          className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-sky-600 dark:text-gray-400 dark:hover:text-white"
          href="/"
        >
          <HomeIcon className="w-4 h-4 mr-1 -mt-0.5" />
        </Link>
      </li>,
    );
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const url = `/?mirrors=${encodeURIComponent(
        parts.slice(0, i + 1).join('/') + '/',
      )}`;
      items.push(
        <span key={`${i}-slash`} className="mx-2 md:mx-3 text-gray-400">
          /
        </span>,
      );
      const name = i === 0 ? props.mirrorConfig.title : part;
      if (i !== parts.length - 1) {
        items.push(
          <li key={i} className="inline-flex items-center">
            <Link
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-sky-600 dark:text-gray-400 dark:hover:text-white"
              href={url}
            >
              {name}
            </Link>
          </li>,
        );
      } else {
        items.push(
          <li key={i}>
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {name}
              </span>
            </div>
          </li>,
        );
      }
    }
    return items;
  };
  const downloadFile = files?.find(
    (file: File) => file.name === props.searchDownload,
  );
  return (
    <SWRConfig value={{ provider: localStorageProvider }}>
      <Breadcrumb className="flex px-3 md:px-5 py-2 mb-4 text-xs md:text-base text-gray-700 border border-gray-200 rounded-lg bg-gray-50 overflow-x-scroll whitespace-nowrap">
        {BreadcrumbItems()}
      </Breadcrumb>
      {props.searchDownload && downloadFile && (
        <div className="w-full mb-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col items-center py-6 px-6">
            <h5 className="mb-1 mx-auto w-full text-xl font-medium text-gray-900 dark:text-white text-center">
              正在请求下载{' '}
              <span className="text-sky-900">{props.searchDownload}</span> 文件
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {downloadFile?.size
                ? '文件大小：' + sizeToTGMKByte(downloadFile?.size)
                : '无法估计文件大小'}
            </span>
            <div className="flex mt-2 space-x-3 md:mt-4">
              <a
                className="inline-flex items-center px-4 py-1.5 text-sm font-medium text-center text-white bg-sky-700 rounded-lg hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
                href={`/${props.mirrorsPath}${props.searchDownload}`}
                download
              >
                确认下载
              </a>
              <Link
                className="inline-flex items-center px-4 py-1 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                href={`/?mirrors=${encodeURIComponent(props.mirrorsPath)}`}
                prefetch={false}
              >
                取消
              </Link>
            </div>
          </div>
        </div>
      )}
      <FilesTable
        mirrorConfig={props.mirrorConfig}
        isLoading={isLoading}
        isRoot={parts.length === 1}
        mirrorsPath={props.mirrorsPath}
        filter={props.filter}
        files={files}
        error={error}
      />
    </SWRConfig>
  );
}

type Filter = {
  name: string;
  showGit: boolean;
  showProxy: boolean;
  showMirrorZ: boolean;
};

export function HomeMain() {
  const [filter, setFilter] = useState<Filter>({
    name: '',
    showGit: true,
    showProxy: true,
    showMirrorZ: false,
  });
  const searchParams = useSearchParams();
  if (!searchParams) return null;
  let mirrorsPath = searchParams.get('mirrors');
  const searchDownload = searchParams.get('download') || undefined;
  let mirrorConfig = undefined;
  if (mirrorsPath) {
    mirrorsPath = path.resolve('/' + mirrorsPath).slice(1) + '/';
    const parts = mirrorsPath.split('/').filter((part) => part !== '');
    mirrorConfig = mirrorConfigs.find((mirrorInfo) =>
      mirrorInfo.alias.includes(parts[0]),
    );
  }
  function getStatus(status: string) {
    switch (status) {
      case 'available':
        return (
          <span className="flex items-center text-green-500">
            正常运行
            <span className="relative flex h-2 w-2 ml-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
          </span>
        );
      case 'degraded':
        return (
          <span className="flex items-center text-yellow-600">
            服务降级
            <span className="relative flex h-2 w-2 ml-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
            </span>
          </span>
        );
      case 'unavailable':
        return (
          <span className="flex items-center text-red-500">
            不可用
            <span className="relative flex h-2 w-2 ml-1">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          </span>
        );
      default:
        return (
          <span className="flex items-center text-gray-500">
            未知
            <span className="relative flex h-2 w-2 ml-1">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-500"></span>
            </span>
          </span>
        );
    }
  }
  return (
    <div className="pt-6 lg:pt-8">
      <div className="md:flex md:items-center md:justify-between pb-4">
        <div className="flex items-center pb-4 md:pb-0">
          <div className="font-medium text-xl">
            <CloudIcon className="inline -mt-1" /> 镜像列表
          </div>
          <div className="flex ml-10 text-xs">
            <span>当前状态：</span>
            {getStatus('degraded')}
          </div>
        </div>
        <label htmlFor="table-filter" className="sr-only">
          Filter
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>
          {/* <span className="absolute inset-y-0 right-0 items-center pr-3 pointer-events-none text-xs space-x-1 hidden md:flex">
            <kbd className="px-1 py-0.5 text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
              <CommandIcon className="w-3 h-3 inline" />
            </kbd>
            <span>+</span>
            <kbd className="px-1.5 py-0.5 text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
              K
            </kbd>
          </span> */}
          <input
            type="text"
            id="table-filter"
            // className="block p-2 px-8 md:pr-20 text-sm w-full text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-sky-500 focus:border-sky-500"
            className="block p-2 px-8 text-sm w-full text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-sky-500 focus:border-sky-500"
            placeholder={mirrorsPath && mirrorConfig ? '查找文件' : '查找镜像'}
            onChange={(e) => {
              setFilter({ ...filter, name: e.target.value });
            }}
            autoFocus
          />
        </div>
      </div>
      {mirrorsPath && mirrorConfig ? (
        <Files
          mirrorsPath={mirrorsPath}
          searchDownload={searchDownload}
          mirrorConfig={mirrorConfig}
          filter={filter}
        />
      ) : (
        <>
          <Mirrors filter={filter} />
          <div className="pt-4 pb-2 flex flex-col space-y-2 md:space-y-0 md:space-x-3 md:flex-row">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <Checkbox
                  id="check-git"
                  className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300 rounded"
                  defaultChecked={filter.showGit}
                  onChange={(event) => {
                    setFilter({ ...filter, showGit: event.target.checked });
                  }}
                />
              </div>
              <label
                htmlFor="check-git"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                包含 Git 仓库的镜像
              </label>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <Checkbox
                  id="check-proxy"
                  className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300 rounded"
                  defaultChecked={filter.showProxy}
                  onChange={(event) => {
                    setFilter({ ...filter, showProxy: event.target.checked });
                  }}
                />
              </div>
              <label
                htmlFor="check-proxy"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                包含通过代理的镜像
              </label>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <Checkbox
                  id="check-mirrorz"
                  className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300 rounded"
                  defaultChecked={filter.showMirrorZ}
                  onChange={(event) => {
                    setFilter({ ...filter, showMirrorZ: event.target.checked });
                  }}
                />
              </div>
              <label
                htmlFor="check-mirrorz"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                包含 MirrorZ.org 的镜像
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
