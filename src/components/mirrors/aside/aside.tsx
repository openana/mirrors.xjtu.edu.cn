import * as React from 'react';
import { Link } from 'gatsby';

import { BsChatText, BsCompass, BsDisc, BsNewspaper } from 'react-icons/bs';

const Aside = () => {
  return (
    <ul>
      <li>
        <h4 className="mb-3 text-slate-900 text-xl font-medium">
          <BsNewspaper className="inline text-2xl mb-1" />
          <span className="ml-2">新闻通知</span>
        </h4>
        <ul className="space-y-1 ml-2 text-slate-700">
          {[
            {
              name: 'PLACEHOLDER',
              time: '202X年3月9日',
              to: '#PLACEHOLDER"',
            },
            {
              name: 'PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER',
              time: '202X年3月9日',
              to: '#PLACEHOLDER"',
            },
            {
              name: 'PLACEHOLDER',
              time: '202X年3月9日',
              to: '#PLACEHOLDER"',
            },
            {
              name: 'PLACEHOLDER',
              time: '202X年3月9日',
              to: '#PLACEHOLDER"',
            },
          ].map(({ name, time, to }, key) => (
            <li key={key}>
              <Link
                className="block px-2 py-1 rounded-md transition-colors duration-500 hover:bg-slate-100 hover:text-slate-900"
                to={to}
              >
                <p className="truncate">{name}</p>
                <p className="text-xs text-slate-500">{time}</p>
              </Link>
            </li>
          ))}
        </ul>
      </li>
      <li className="mt-6">
        <h4 className="mb-3 text-slate-900 text-xl font-medium">
          <BsDisc className="inline text-2xl mb-1" />
          <span className="ml-2">资源下载</span>
        </h4>
      </li>
      <li className="mt-6">
        <h4 className="mb-3 text-slate-900 text-xl font-medium">
          <BsChatText className="inline text-2xl mb-1" />
          <span className="ml-2">联系我们</span>
        </h4>
      </li>
      <li className="mt-6">
        <h4 className="mb-3 text-slate-900 text-xl font-medium">
          <BsCompass className="inline text-2xl mb-1" />
          <span className="ml-2">相关链接</span>
        </h4>
      </li>
    </ul>
  );
};

export default Aside;
