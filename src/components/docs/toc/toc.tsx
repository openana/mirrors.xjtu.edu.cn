import * as React from 'react';

import { ITableOfContents } from './types';

const ToC: React.FC<{ tableOfContents?: ITableOfContents }> = ({
  tableOfContents,
}) => {
  return (
    <div className="fixed">
      <div className="relative top-0 bottom-0 overflow-y-auto">
        <h5 className="text-slate-900 font-semibold mb-4 text-sm leading-6">
          目录
        </h5>
        <ul className="text-slate-700 text-sm leading-6">
          {tableOfContents?.items?.map((item, key) => (
            <li key={key}>
              <a
                href={item.url}
                className="block py-1 font-medium hover:text-slate-900"
              >
                {item.title}
              </a>
              <ul className="ml-4">
                {item.items?.map((item, key) => (
                  <li key={key}>
                    <a
                      href={item.url}
                      className="flex items-start py-1 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToC;
