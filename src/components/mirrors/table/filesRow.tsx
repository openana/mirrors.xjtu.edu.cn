import * as React from 'react';
import { Link } from 'gatsby';

import { formatISO9075 } from 'date-fns';

import {
  BsArrowRepeat,
  BsHouseDoorFill,
  BsFileEarmarkBinaryFill,
  BsFileEarmarkBreakFill,
  BsFileEarmarkCodeFill,
  BsFileEarmarkFontFill,
  BsFileEarmarkImageFill,
  BsFileEarmarkMusicFill,
  BsFileEarmarkPdfFill,
  BsFileEarmarkPlayFill,
  BsFileEarmarkRichtextFill,
  BsFileEarmarkRuledFill,
  BsFileEarmarkSlidesFill,
  BsFileEarmarkSpreadsheetFill,
  BsFileEarmarkTextFill,
  BsFileEarmarkWordFill,
  BsFileEarmarkZipFill,
  BsFileEarmarkFill,
  BsFolderCheck,
  BsHddNetworkFill,
} from 'react-icons/bs';

import { IFilesData } from './types';

const sizeToTGMKByte = (bytes: number) => {
  if (bytes === 0) return '0 B';
  let k = 1024,
    sizes = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const FilesTableRow: React.FC<{ item: IFilesData }> = ({ item }) => {
  const { type, name, size, lastModified } = item;
  return (
    <tr className="flex px-2 py-1 space-x-2 transition-colors duration-200 hover:bg-slate-100">
      <td className="flex-none w-4">
        {type === '@back' ? (
          <BsFolderCheck className="inline text-base h-4 mb-0.5" />
        ) : type === '@load' ? (
          <BsArrowRepeat className="inline text-base h-4 mb-0.5 animate-spin" />
        ) : type === '@none' ? (
          <BsFileEarmarkBreakFill className="inline text-base h-4 mb-0.5" />
        ) : type === 'directory' ? (
          <BsFolderCheck className="inline text-base h-4 mb-0.5" />
        ) : (
          type === 'file' &&
          (name === 'index.html' ? (
            <BsHouseDoorFill className="inline text-base h-4 mb-0.5" />
          ) : /^.*\.(?:exe|bin|deb|msi|dmg|pkg|apk|rpm|run)$/i.test(name) ? (
            <BsFileEarmarkBinaryFill className="inline text-base h-4 mb-0.5" />
          ) : /^.*\.(?:sh|bash|py|go|cc?|cpp|h|hpp)$/i.test(name) ? (
            <BsFileEarmarkCodeFill className="inline text-base h-4 mb-0.5" />
          ) : /^.*\.(?:ttf|otf)$/i.test(name) ? (
            <BsFileEarmarkFontFill className="inline text-base h-4 mb-0.5" />
          ) : /^.*\.(?:gif|jpe?g|tiff?|png|webp|bmp|svg)$/i.test(name) ? (
            <BsFileEarmarkImageFill className="inline text-base h-4 mb-0.5" />
          ) : /^.*\.(?:mp3|flac|wav|weba)$/i.test(name) ? (
            <BsFileEarmarkMusicFill className="inline text-base h-4 mb-0.5" />
          ) : /^.*\.(?:mp4|flv|rmvb|mkv|webm)$/i.test(name) ? (
            <BsFileEarmarkPdfFill className="inline text-base h-4 mb-0.5" />
          ) : /^.*\.(?:pdf)$/i.test(name) ? (
            <BsFileEarmarkPlayFill className="inline text-base h-4 mb-0.5" />
          ) : /^.*\.(?:html|md)$/i.test(name) ? (
            <BsFileEarmarkRichtextFill className="inline text-base h-4 mb-0.5" />
          ) : /^.*\.(?:fileRuled)$/i.test(name) ? (
            <BsFileEarmarkRuledFill className="inline text-base h-4 mb-0.5" />
          ) : /^.*\.(?:pptx?)$/i.test(name) ? (
            <BsFileEarmarkSlidesFill className="inline text-base h-4 mb-0.5" />
          ) : /^.*\.(?:xlsx?|jsonp?|csv)$/i.test(name) ? (
            <BsFileEarmarkSpreadsheetFill className="inline text-base h-4 mb-0.5" />
          ) : /^.*\.(?:txt)$/i.test(name) ? (
            <BsFileEarmarkTextFill className="inline text-base h-4 mb-0.5" />
          ) : /^.*\.(?:docx?)$/i.test(name) ? (
            <BsFileEarmarkWordFill className="inline text-base h-4 mb-0.5" />
          ) : /^.*\.(?:zip|tar|t?gz|bz2|rar|xz|zst)$/i.test(name) ? (
            <BsFileEarmarkZipFill className="inline text-base h-4 mb-0.5" />
          ) : (
            <BsFileEarmarkFill className="inline text-base h-4 mb-0.5" />
          ))
        )}
      </td>
      <td className="flex-none basis-1/4 overflow-hidden">
        <p className="truncate">
          {type === '@back' || type === 'directory' ? (
            <Link
              className="transition-colors duration-500 text-sky-600 hover:text-sky-800"
              to={`${name}/#cache`}
            >
              {name}
            </Link>
          ) : type === 'file' ? (
            <Link
              className="transition-colors duration-500 text-sky-600 hover:text-sky-800"
              to={`./#download=${name}`}
            >
              {name}
            </Link>
          ) : (
            name
          )}
        </p>
      </td>
      <td className="flex-auto overflow-hidden">
        {size && sizeToTGMKByte(size)}
      </td>
      <td className="flex-none w-48 text-right">
        {lastModified && formatISO9075(lastModified)}
      </td>
    </tr>
  );
};

export default FilesTableRow;
