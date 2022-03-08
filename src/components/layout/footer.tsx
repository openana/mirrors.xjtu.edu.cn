import * as React from 'react';
import { Link } from 'gatsby';

interface Props {
  location?: Location;
}

const Footer = ({ location }: Props): JSX.Element => {
  return (
    <div className="z-40 w-full flex-none transition-colors duration-500 bg-gray-500">
      <div className="max-w-8xl mx-auto">
        <div className="pt-6 pb-12 px-4 sm:px-6 md:px-8">
          <div className="pt-4 relative w-full text-sm text-gray-200">
            <p className="mb-2">
              西安交通大学软件镜像站由{' '}
              <a
                className="transition-colors duration-500 hover:text-white"
                href="https://nic.xjtu.edu.cn/"
              >
                西安交通大学网络信息中心
              </a>{' '}
              提供相关设备和资源支持，由{' '}
              <a
                className="transition-colors duration-500 hover:text-white"
                href="https://xjtuana.com/"
              >
                西安交通大学学生网络管理协会
              </a>{' '}
              进行维护和运营。
            </p>
            <p className="mb-2">
              西安交通大学学生网络管理协会（简称西交网管会，XJTUANA）是由西安交通大学热爱网络技术，开源软件和校园信息化项目开发的同学们组成的学生科技类社团。
            </p>
            <p className="mb-2">
              除特殊注明外，本站内容均在{' '}
              <a
                className="transition-colors duration-500 hover:text-white"
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode"
              >
                CC BY-NC-SA 4.0
              </a>{' '}
              与{' '}
              <a
                className="transition-colors duration-500 hover:text-white"
                href="https://www.gnu.org/licenses/gpl-3.0"
              >
                GNU General Public License v3.0
              </a>{' '}
              许可下发布，相关源码可在{' '}
              <a
                className="transition-colors duration-500 hover:text-white"
                href="https://github.com/openana/mirrors.xjtu.edu.cn"
              >
                GitHub
              </a>{' '}
              获取。根据相关法律法规，本站部分服务仅对西安交通大学校内用户提供。
            </p>
          </div>
          <div className="pt-4 relative flex justify-between w-full text-sm text-gray-200">
            <div>
              Copyright &copy; {new Date().getFullYear()}{' '}
              <a
                className="transition-colors duration-500 hover:text-white"
                href="https://xjtuana.com/"
              >
                XJTUANA
              </a>
              . 保留所有权利。
            </div>
            <div className="text-white">
              服务状态: <span className="text-yellow-300">未知</span>{' '}
              <span className="text-green-300">正常运行</span>{' '}
              <span className="text-red-300">不可用</span>
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
                ].map(({ to, title }) => {
                  return (
                    <li className="ml-6">
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
