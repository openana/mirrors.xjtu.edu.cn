'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CloudIcon, HomeIcon, SearchIcon } from 'lucide-react';
import { Breadcrumb } from 'flowbite-react';

import useSWR, { SWRConfig, useSWRConfig } from 'swr';

import { FilesTable } from '@/components/files-table';
import { MirrorsTable } from '@/components/mirrors-table';
import { mirrorConfigs } from '@/config/mirrors';
import { type MirrorConfig } from '@/config/mirrors';
import path from 'path';

function Mirrors() {
  const [mirrors, setMirrors] = useState([]);
  const [counter, setCounter] = useState(true);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/mirrors.json')
      .then((res) => res.json())
      .then((data) => {
        data.push({
          name: 'pypi',
          status: 'proxy',
          last_update_ts: -1,
        });
        setMirrors(data);
        setLoading(false);
      });
    const interval = setInterval(() => {
      setCounter(!counter);
    }, 300000);
    return () => clearInterval(interval);
  }, [counter]);

  return <MirrorsTable isLoading={isLoading} mirrors={mirrors} />;
}

type FilesProps = {
  mirrorsPath: string;
  mirrorConfig: MirrorConfig;
};

const localStorageProvider = () => {
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

function Files({ mirrorsPath, mirrorConfig }: FilesProps) {
  const { cache, mutate, ...extraConfig } = useSWRConfig();

  const fetcher = async (url: string) => {
    const cachedData = cache.get(url);
    if (cachedData?.data && !cachedData.isLoading) {
      return cachedData.data;
    }

    const res = await fetch(url);

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

  const { data, error } = useSWR('/api/mirrors/' + mirrorsPath, fetcher);
  const files = data;
  const isLoading = !error && !data;

  const parts = mirrorsPath.split('/').filter((part) => part !== '');
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
      const url = `/?mirrors=${parts.slice(0, i + 1).join('/')}/`;
      items.push(
        <span key={`${i}-slash`} className="mx-2 md:mx-3 text-gray-400">
          /
        </span>,
      );
      const name = i === 0 ? mirrorConfig.title : part;
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
  return (
    <SWRConfig value={{ provider: localStorageProvider }}>
      <Breadcrumb className="flex px-5 py-2 mb-4 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 overflow-x-scroll">
        {BreadcrumbItems()}
      </Breadcrumb>
      <FilesTable
        mirrorConfig={mirrorConfig}
        isLoading={isLoading}
        isRoot={parts.length === 1}
        mirrorsPath={mirrorsPath}
        files={files}
        error={error}
      />
    </SWRConfig>
  );
}

export function HomeMain() {
  let mirrorsPath = useSearchParams().get('mirrors');
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
          <span className="flex items-center text-yellow-500">
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
          <span className="absolute inset-y-0 right-0 items-center pr-3 pointer-events-none text-xs font-semibold space-x-1 hidden md:flex">
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
            className="block p-2 pl-8 pr-24 text-sm w-full text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-sky-500 focus:border-sky-500"
            placeholder="查找镜像"
          />
        </div>
      </div>
      {mirrorsPath && mirrorConfig ? (
        <Files mirrorsPath={mirrorsPath} mirrorConfig={mirrorConfig} />
      ) : (
        <Mirrors />
      )}
    </div>
  );
}
