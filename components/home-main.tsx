'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CloudIcon, HomeIcon, SearchIcon } from 'lucide-react';

import { MirrorsTable } from '@/components/mirrors-table';

import { mirrorConfigs } from '@/config/mirrors';

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

function Indexes({ path }: { path: string }) {
  const parts = path.split('/').filter((part) => part);
  const mirrorConfig = mirrorConfigs.find((mirrorInfo) =>
    mirrorInfo.alias.includes(parts[0]),
  );
  if (!mirrorConfig) {
    return <Mirrors />;
  }
  const BreadcrumbItems = () => {
    const items = [];
    items.push(
      <li className="inline-flex items-center">
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
        <span key={`${i}-slash`} className="mx-1 text-gray-400">
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
    <div className="flex px-5 py-2 text-gray-700 border border-gray-200 rounded-lg bg-gray-50">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {BreadcrumbItems()}
      </ol>
    </div>
  );
}

export function HomeMain() {
  const path = useSearchParams().get('mirrors');
  return (
    <div>
      <div className="flex items-center justify-between pb-4 overflow-hidden">
        <div className="flex items-center">
          <div className="font-medium text-xl">
            <CloudIcon className="inline -mt-1" /> 镜像列表
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
            {/* <span className="px-2">/</span>
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
            </span> */}
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
      {path ? <Indexes path={path} /> : <Mirrors />}
    </div>
  );
}
