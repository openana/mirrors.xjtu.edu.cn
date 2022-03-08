import * as React from 'react';
import { PageProps } from 'gatsby';

import { BsFolderFill, BsSortAlphaDown } from 'react-icons/bs';

import { IFiles, IFilesData } from './types';
import FilesTableRow from './filesRow';

const FilesTable: React.FC<PageProps> = ({ location }) => {
  const [files, setFiles] = React.useState<IFiles>({
    data: [],
    loading: false,
    error: null,
  });

  const setFilesData = (data: IFilesData[]) => {
    setFiles({
      data: data.map((item) => {
        return item.mtime
          ? { ...item, lastModified: new Date(item.mtime) }
          : item;
      }),
      loading: false,
      error: null,
    });
  };

  const FETCH_INTERVAL = 3600000; // 60 minutes

  React.useEffect(() => {
    setFiles({
      data: files.data,
      loading: true,
      error: null,
    });
    const raw = localStorage.getItem(`fetch:cache:/api${location.pathname}`);
    if (raw) {
      const cache: { data: IFilesData[]; time: number } = JSON.parse(raw);
      if (Date.now() - cache.time < FETCH_INTERVAL) {
        console.log('using cache', cache);
        setFilesData(cache.data);
        return;
      }
    }
    fetch(`/api${location.pathname}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length < 2000) {
          console.log('saving cache', { data: data, time: Date.now() });
          localStorage.setItem(
            `fetch:cache:/api${location.pathname}`,
            JSON.stringify({
              data: data,
              time: Date.now(),
            }),
          );
        }
        setFilesData(data);
      })
      .catch((err) => {
        setFiles({
          data: files.data,
          loading: false,
          error: err,
        });
      });
  }, [location.pathname]);

  return (
    <table className="flex flex-col text-sm">
      <thead className="flex flex-col border-b font-medium text-slate-600">
        <tr className="flex p-2 space-x-2">
          <th className="flex-none w-4 text-left">
            <BsFolderFill className="inline text-base h-4 mb-0.5" />
          </th>
          <th className="flex-none basis-1/4 text-left">
            文件名称
            <BsSortAlphaDown className="inline text-base h-4 mb-0.5" />
          </th>
          <th className="flex-auto overflow-hidden text-left">文件大小</th>
          <th className="flex-none w-48 text-right">修改时间</th>
        </tr>
      </thead>
      <tbody className="flex flex-col text-slate-600">
        <FilesTableRow item={{ name: '..', type: '@back' }} />
        {files.loading ? (
          <FilesTableRow item={{ name: 'loading', type: '@load' }} />
        ) : files.error ? (
          <FilesTableRow item={{ name: 'error', type: '@fail' }} />
        ) : files.data.length === 0 ? (
          <FilesTableRow item={{ name: 'empty', type: '@none' }} />
        ) : (
          files.data
            .slice(0, 1000)
            .map((item, key) => <FilesTableRow item={item} key={key} />)
        )}
      </tbody>
    </table>
  );
};

export default FilesTable;
