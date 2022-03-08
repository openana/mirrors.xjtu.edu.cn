import * as React from 'react';
import { Link } from 'gatsby';

interface Props {
  location?: Location;
}

const Header = ({ location }: Props): JSX.Element => {
  return (
    <div className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 bg-sky-700/80">
      <div className="max-w-8xl mx-auto">
        <div className="py-4 px-4 sm:px-6 md:px-8">
          <div className="relative flex items-center">
            <div className="text-2xl font-light text-white">
              西安交通大学软件镜像站
            </div>
            <div className="relative hidden md:flex items-center ml-auto">
              <nav className="leading-6 font-light text-sky-300">
                <ul className="flex">
                  {[
                    {
                      to: '/',
                      title: '主页',
                    },
                    {
                      partiallyActive: true,
                      to: '/mirrors/',
                      title: '镜像',
                    },
                    {
                      partiallyActive: true,
                      to: '/software/',
                      title: '软件',
                    },
                    {
                      partiallyActive: true,
                      to: '/service/',
                      title: '服务',
                    },
                    {
                      partiallyActive: true,
                      to: '/docs/',
                      title: '文档',
                    },
                    {
                      partiallyActive: true,
                      to: '/news/',
                      title: '新闻',
                    },
                    {
                      to: '/about/',
                      title: '关于',
                    },
                  ].map(({ partiallyActive, to, title }) => {
                    return (
                      <li>
                        <Link
                          activeClassName="!text-sky-50"
                          className="p-2 transition-colors duration-500 hover:text-sky-100"
                          partiallyActive={partiallyActive}
                          to={to}
                        >
                          {title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
