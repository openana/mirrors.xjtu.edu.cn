import * as React from 'react';

import { ITableOfContents } from './types';

const ToC: React.FC<{ tableOfContents?: ITableOfContents }> = ({
  tableOfContents,
}) => {
  return (
    <div className="fixed">
      <h5 className="text-slate-900 font-semibold mb-4 text-sm leading-6">
        目录
      </h5>
      <ul className="text-slate-700 text-sm leading-6">
        {tableOfContents?.items?.map(({ title, url }, key) => (
          <li key={key}>
            <a
              href={url}
              className="block py-1 font-medium hover:text-slate-900"
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToC;
