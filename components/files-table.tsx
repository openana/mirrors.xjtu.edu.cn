'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import {
  DownloadIcon,
  FileAudioIcon,
  FileCodeIcon,
  FileDigitIcon,
  FileIcon,
  FilePieChartIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  FileTypeIcon,
  FileVideoIcon,
  FolderIcon,
  HomeIcon,
  FileImageIcon,
  FileArchiveIcon,
  FolderOpenIcon,
  FileSymlinkIcon,
  FolderSymlinkIcon,
  FileJsonIcon,
} from 'lucide-react';
import path from 'path';
import { MirrorConfig } from '@/config/mirrors';
import { useState } from 'react';

const sizeToTGMKByte = (bytes: number) => {
  if (bytes === 0) return '0 B';
  let k = 1024,
    sizes = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

type File = {
  name: string;
  type: string;
  mtime: string;
  size?: number;
};

type FilesTableProps = {
  mirrorConfig: MirrorConfig;
  mirrorsPath: string;
  isLoading: boolean;
  isRoot: boolean;
  filter: any;
  files: File[];
  error?: any;
};

type TableRowProps = {
  mirrorsPath: string;
  item: File;
  linkTo?: string;
};

function TableRow({ mirrorsPath, item, linkTo }: TableRowProps) {
  let prefixIcon = undefined;
  let suffixIcon = undefined;
  if (item.type === 'directory') {
    prefixIcon = linkTo ? (
      <FolderSymlinkIcon className="inline-block h-4 w-4 mr-1 -mt-0.5" />
    ) : (
      <FolderIcon className="inline-block h-4 w-4 mr-1 -mt-0.5" />
    );
  } else {
    prefixIcon =
      item.name === 'index.html' ? (
        <HomeIcon className="inline-block h-4 w-4 mr-1 -mt-0.5" />
      ) : linkTo ? (
        <FileSymlinkIcon className="inline-block h-4 w-4 mr-1 -mt-0.5" />
      ) : /^.*\.(?:exe|bin|deb|msi|dmg|pkg|apk|rpm|run)$/i.test(item.name) ? (
        <FileDigitIcon className="inline-block h-4 w-4 mr-1 -mt-0.5" />
      ) : /^.*\.(?:sh|bash|py|go|cc?|cpp|h|hpp|css|pl)$/i.test(item.name) ? (
        <FileCodeIcon className="inline-block h-4 w-4 mr-1 -mt-0.5" />
      ) : /^.*\.(?:ttf|otf)$/i.test(item.name) ? (
        <FileTypeIcon className="inline-block h-4 w-4 mr-1 -mt-0.5" />
      ) : /^.*\.(?:gif|jpe?g|tiff?|png|webp|bmp|svg|ico)$/i.test(item.name) ? (
        <FileImageIcon className="inline-block h-4 w-4 mr-1 -mt-0.5" />
      ) : /^.*\.(?:mp3|flac|wav|weba)$/i.test(item.name) ? (
        <FileAudioIcon className="inline-block h-4 w-4 mr-1 -mt-0.5" />
      ) : /^.*\.(?:mp4|flv|rmvb|mkv|webm)$/i.test(item.name) ? (
        <FileVideoIcon className="inline-block h-4 w-4 mr-1 -mt-0.5" />
      ) : /^.*\.(?:pdf)$/i.test(item.name) ? (
        <FileIcon className="inline-block h-4 w-4 mr-1 -mt-0.5" />
      ) : /^.*\.(?:html|md)$/i.test(item.name) ? (
        <FileIcon className="inline-block h-4 w-4 mr-1 -mt-0.5" />
      ) : /^.*\.(?:fileRuled)$/i.test(item.name) ? (
        <FileIcon className="inline-block h-4 w-4 mr-1 -mt-0.5" />
      ) : /^.*\.(?:pptx?)$/i.test(item.name) ? (
        <FilePieChartIcon className="inline-block h-4 w-4 mr-1 -mt-0.5" />
      ) : /^.*\.(?:xlsx?|csv)$/i.test(item.name) ? (
        <FileSpreadsheetIcon className="inline-block h-4 w-4 mr-1 -mt-0.5" />
      ) : /^.*\.(?:jsonp?)$/i.test(item.name) ? (
        <FileJsonIcon className="inline-block h-4 w-4 mr-1 -mt-0.5" />
      ) : /^.*\.(?:txt)$/i.test(item.name) ? (
        <FileTextIcon className="inline-block h-4 w-4 mr-1 -mt-0.5" />
      ) : /^.*\.(?:docx?)$/i.test(item.name) ? (
        <FileIcon className="inline-block h-4 w-4 mr-1 -mt-0.5" />
      ) : /^.*\.(?:zip|tar|t?gz|bz2|rar|xz|zst)$/i.test(item.name) ? (
        <FileArchiveIcon className="inline-block h-4 w-4 mr-1 -mt-0.5" />
      ) : (
        <FileIcon className="inline-block h-4 w-4 mr-1 -mt-0.5" />
      );
    suffixIcon = <DownloadIcon className="inline-block h-4 w-4 ml-1 -mt-0.5" />;
  }
  return (
    <tr className="border-t transition-colors animate-fade-in bg-white hover:bg-sky-50">
      <td className="pl-4 md:pl-6 pr-2 py-2 truncate">
        {item.type === 'directory' ? (
          <Link
            className="text-sky-700 transition-colors hover:text-sky-900 hover:underline"
            href={`/?mirrors=${path.resolve(
              mirrorsPath + (linkTo ? linkTo : item.name),
            )}/`}
            prefetch={false}
          >
            {prefixIcon}
            {item.name}/{suffixIcon}
          </Link>
        ) : (
          <span>
            {prefixIcon}
            {item.name}
            {suffixIcon}
          </span>
        )}
      </td>
      <td className="pl-2 pr-4 md:pr-6 py-2 text-end">
        {item.size !== undefined ? sizeToTGMKByte(item.size) : '-'}
      </td>
      <td className="pr-6 pl-2 py-2 text-end hidden md:table-cell">
        <span>{format(new Date(item.mtime), 'yyyy/MM/dd HH:mm:ss')}</span>
      </td>
    </tr>
  );
}

const MAX_LENGTH = 2000;

export function FilesTable(props: FilesTableProps) {
  const getLinkTo = (item: File) => {
    return props.mirrorConfig.files?.find(
      (file) =>
        (file.path === '*' || file.path === props.mirrorsPath) &&
        file.name === item.name,
    )?.linkTo;
  };
  const files = props.files?.filter((item) => {
    if (props.filter.name === '') {
      return true;
    }
    return item.name.toLowerCase().includes(props.filter.name.toLowerCase());
  });
  return (
    <table className="relative table-fixed w-full text-sm text-left text-gray-500 rounded-md overflow-hidden dark:text-gray-400">
      <thead className="text-xs text-sky-700 uppercase bg-gray-50 dark:bg-sky-700 dark:text-sky-400">
        <tr>
          <th scope="col" className="pl-4 md:pl-6 pr-2 py-3">
            Name
          </th>
          <th scope="col" className="pl-2 pr-4 md:pr-6 py-3 text-end w-28">
            Size
          </th>
          <th
            scope="col"
            className="w-0 p-0 text-end overflow-hidden md:pr-6 md:pl-2 md:py-3 md:w-48"
          >
            Date
          </th>
        </tr>
      </thead>
      <tbody>
        {files?.length > MAX_LENGTH && (
          <tr className="bg-white border-t dark:bg-gray-800 dark:border-gray-700">
            <td
              colSpan={3}
              className="px-4 md:px-6 py-4 text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 text-center"
            >
              抱歉，我们不得不将此目录截断为 {MAX_LENGTH.toLocaleString()}{' '}
              个文件。
              {(files.length - MAX_LENGTH).toLocaleString()}{' '}
              个条目被省略了。别担心，您仍然可以搜索或对它们进行排序。
            </td>
          </tr>
        )}
        {!props.isRoot && (
          <tr className="border-t transition-colors animate-fade-in bg-white hover:bg-sky-50">
            <td colSpan={3} className="px-4 md:px-6 py-2 truncate">
              <Link
                className="text-sky-700 transition-colors hover:text-sky-900 hover:underline"
                href={`/?mirrors=${path.resolve(props.mirrorsPath + '../')}/`}
                prefetch={false}
              >
                <FolderOpenIcon className="inline-block h-4 w-4 mr-1 -mt-0.5" />
                ../
              </Link>
            </td>
          </tr>
        )}
        {props.isLoading ? (
          <tr className="bg-white border-t dark:bg-gray-800 dark:border-gray-700">
            <td
              colSpan={3}
              className="px-4 md:px-6 py-2 text-sky-900 dark:text-white"
            >
              Loading...
            </td>
          </tr>
        ) : props.error ? (
          <tr className="bg-white border-t dark:bg-gray-800 dark:border-gray-700">
            <td
              colSpan={3}
              className="px-4 md:px-6 py-2 text-sky-900 dark:text-white"
            >
              {props.error.status}: {props.error.message}
            </td>
          </tr>
        ) : files.length === 0 ? (
          <tr className="bg-white border-t dark:bg-gray-800 dark:border-gray-700">
            <td
              colSpan={3}
              className="px-4 md:px-6 py-2 text-gray-900 dark:text-white"
            >
              No files found
            </td>
          </tr>
        ) : (
          files
            .slice(0, MAX_LENGTH)
            .map((item, key) => (
              <TableRow
                key={key}
                mirrorsPath={props.mirrorsPath}
                item={item}
                linkTo={getLinkTo(item)}
              />
            ))
        )}
      </tbody>
    </table>
  );
}
