import * as React from 'react';
import { Link } from 'gatsby';

import { BsBoxArrowUpRight } from 'react-icons/bs';

interface Props {
  location?: Location;
}

const ExternalLink: React.FC<{ href: string; title: string }> = ({
  href,
  title,
}) => {
  return (
    <a
      className="external-link"
      href={href}
      rel="noopener noreferrer nofollow"
      target="_blank"
    >
      {title}
      <BsBoxArrowUpRight className="inline stroke-1 h-2.5 mb-1" />
    </a>
  );
};

const Footer = ({ location }: Props): JSX.Element => {
  return (
    <div className="z-40 w-full flex-none transition-colors duration-500 bg-gray-500">
      <div className="app-footer max-w-8xl mx-auto">
        <div className="pt-6 pb-12 px-4 sm:px-6 md:px-8">
          <div className="pt-4 relative w-full text-sm text-gray-200">
            <p className="mb-2">
              西安交通大学软件镜像站由{' '}
              <ExternalLink
                href="https://nic.xjtu.edu.cn/"
                title="西安交通大学网络信息中心"
              />{' '}
              提供相关设备和资源支持，由{' '}
              <ExternalLink
                href="https://xjtuana.com/"
                title="西安交通大学学生网络管理协会"
              />{' '}
              进行维护和运营。
            </p>
            <p className="mb-2">
              西安交通大学学生网络管理协会（简称西交网管会，XJTUANA）是由西安交通大学热爱网络技术，开源软件和校园信息化项目开发的同学们组成的学生科技类社团。
            </p>
            <p className="mb-2">
              除特殊注明外，本站内容均在{' '}
              <ExternalLink
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode"
                title="CC BY-NC-SA 4.0"
              />{' '}
              与{' '}
              <ExternalLink
                href="https://www.gnu.org/licenses/gpl-3.0"
                title="GNU General Public License v3.0"
              />{' '}
              许可下发布，相关源码可在{' '}
              <ExternalLink
                href="https://github.com/openana/mirrors.xjtu.edu.cn"
                title="GitHub"
              />{' '}
              获取。根据相关法律法规，本站部分服务仅对西安交通大学校内用户提供。
            </p>
          </div>
          <div className="pt-4 relative flex justify-between w-full text-sm text-gray-200">
            <div>
              Copyright &copy; {new Date().getFullYear()} XJTUANA.
              保留所有权利。
            </div>
            <div className="text-white">
              当前状态:{' '}
              <span className="relative text-green-300">
                正常运行
                <span className="flex absolute h-2 w-2 top-0 right-0 mt-1 -mr-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-300"></span>
                </span>
              </span>
              {/* <span className="text-gray-300">未知</span>{' '}
              <span className="text-green-300">正常运行</span>{' '}
              <span className="text-yellow-300">部分可用</span>{' '}
              <span className="text-red-300">不可用</span> */}
            </div>
            <div>
              <ul className="flex">
                {[
                  {
                    to: '/terms/',
                    title: '使用条款',
                  },
                  {
                    to: '/privacy/',
                    title: '隐私政策',
                  },
                  {
                    to: '/sitemap/',
                    title: '网站地图',
                  },
                ].map(({ to, title }, key) => {
                  return (
                    <li className="ml-6" key={key}>
                      <Link
                        className="transition-colors duration-500 hover:text-white"
                        to={to}
                      >
                        {title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
