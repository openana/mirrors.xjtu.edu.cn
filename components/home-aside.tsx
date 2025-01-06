import { compareDesc, format } from 'date-fns';
import {
  NewspaperIcon,
  DownloadCloudIcon,
  Contact2Icon,
  Link2Icon,
} from 'lucide-react';
import { allNewsPosts } from 'contentlayer/generated';
import { Link } from '@/components/link';

const downloads = [
  {
    title: 'Arch Linux 发行版',
    href: `/?mirrors=${encodeURIComponent('archlinux/iso/latest/')}`,
  },
  {
    title: 'Fedora Linux 发行版',
    href: `/?mirrors=${encodeURIComponent(
      'fedora/releases/36/Everything/x86_64/iso/',
    )}`,
  },
  {
    title: 'Rocky Linux 发行版',
    href: `/?mirrors=${encodeURIComponent('rocky/9/isos/x86_64/')}`,
  },
  {
    title: 'Debian 发行版',
    href: `/?mirrors=${encodeURIComponent('debian-cd/current/amd64/iso-cd/')}`,
  },
  {
    title: 'Ubuntu 发行版',
    href: `/?mirrors=${encodeURIComponent('ubuntu-releases/23.04/')}`,
  },
  {
    title: 'Linux Kernel',
    href: `/?mirrors=${encodeURIComponent('kernel/')}`,
  },
  {
    title: '校内用户专享',
    href: `/?mirrors=${encodeURIComponent('commercial/')}`,
  },
];

const contacts = [
  {
    desc: '意见反馈',
    title: 'GitHub Issue',
    href: '//github.com/openana/mirrors.xjtu.edu.cn/issues/new',
  },
  {
    desc: '发送邮件',
    title: 'mirrors@xjtu.edu.cn',
    href: 'mailto:mirrors@xjtu.edu.cn',
  },
];

const links = [
  {
    title: '西安交通大学网络信息中心',
    href: '//nic.xjtu.edu.cn',
  },
  {
    title: '西安交通大学学生网络管理协会',
    href: '//ana.xjtu.edu.cn',
  },
  {
    title: '西安交通大学团委挑战网',
    href: '//www.tiaozhan.com',
  },
];

type AsideLinkProps = {
  title: string;
  href: string;
};

const AsideLink = ({ title, href }: AsideLinkProps) => (
  <Link
    className="text-sky-700 hover:text-sky-900 hover:underline"
    title={title}
    href={href}
    {...(href.startsWith('//') && {
      target: '_blank',
      rel: 'noopener noreferrer',
    })}
  />
);

export function HomeAside() {
  const latestNewsPosts = allNewsPosts
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 5);
  return (
    <div className="pt-6 lg:pt-8">
      <div className="flex flex-col space-y-4">
        <div>
          <div className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            <NewspaperIcon className="inline -mt-1" /> 最新通知
          </div>
          <ul className="max-w-md space-y-1 text-gray-500 text-sm list-disc list-inside dark:text-gray-400">
            {latestNewsPosts.map((post) => (
              <li key={post.slug}>
                <AsideLink title={post.title} href={post.url} />
                <div className="pl-5 text-xs text-gray-500">
                  发布于 {format(new Date(post.date), 'yyyy 年 M 月 d 日')}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            <DownloadCloudIcon className="inline -mt-1" /> 资源下载
          </div>
          <ul className="max-w-md space-y-1 text-gray-500 text-sm list-disc list-inside dark:text-gray-400">
            {downloads.map(({ title, href }, key) => (
              <li key={key}>
                <AsideLink title={title} href={href} />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            <Contact2Icon className="inline -mt-1" /> 联系我们
          </div>
          <ul className="max-w-md space-y-1 text-gray-500 text-sm list-disc list-inside dark:text-gray-400">
            {contacts.map(({ desc, title, href }, key) => (
              <li key={key}>
                <span>{desc}：</span>
                <AsideLink title={title} href={href} />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            <Link2Icon className="inline -mt-1" /> 相关链接
          </div>
          <ul className="max-w-md space-y-1 text-gray-500 text-sm list-disc list-inside dark:text-gray-400">
            {links.map(({ title, href }, key) => (
              <li key={key}>
                <AsideLink title={title} href={href} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
