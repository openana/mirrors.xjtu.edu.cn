import Image from 'next/image';
import Link from 'next/link';

const fullYear = new Date().getFullYear();

const footerLinks = [
  { title: '关于', href: '/about/' },
  { title: '服务状态', href: '/status/' },
  { title: '隐私政策', href: '/docs/private-policy/' },
  { title: '使用条款', href: '/docs/terms-of-service/' },
];

const FooterLink = ({ href, title }: { href: string; title: string }) =>
  href.startsWith('//') ? (
    <a
      className="hover:text-neutral-700 hover:underline"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {title}
    </a>
  ) : (
    <Link className="hover:text-neutral-700 hover:underline" href={href}>
      {title}
    </Link>
  );

export default function Footer({}: {}) {
  return (
    <div className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto flex flex-col-reverse">
        <div className="flex flex-row-reverse items-center justify-end flex-wrap p-4 text-xs text-neutral-600">
          <div className="h-6 mt-4">
            {footerLinks.map((link, key) => (
              <div key={key} className="pr-6 pb-2 inline-block ">
                <FooterLink href={link.href} title={link.title} />
              </div>
            ))}
          </div>
          <div className="mr-auto h-6 mt-4">
            Copyright © {fullYear}{' '}
            <FooterLink href="//xjtuana.com" title="西交网管会" />.
            保留所有权利。
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between p-4 text-sm text-neutral-500">
          <div className="max-w-3xl">
            <p className="mb-2">
              西安交通大学软件镜像站由{' '}
              <FooterLink
                href="//nic.xjtu.edu.cn"
                title="西安交通大学网络信息中心"
              />{' '}
              提供相关设备和资源支持，由{' '}
              <FooterLink href="//xjtuana.com" title="西交网管会" />{' '}
              进行维护和运营。
            </p>
            <p className="mb-2">
              西安交通大学学生网络管理协会（简称西交网管会，XJTUANA）是由西安交通大学热爱网络技术，开源软件和校园信息化项目开发的同学们组成的学生科技类社团。
            </p>
            <p className="mb-2">
              除特殊注明外，本站源码在{' '}
              <FooterLink
                href="//github.com/openana/mirrors.xjtu.edu.cn/blob/main/LICENSE"
                title="MIT"
              />{' '}
              许可下发布，本站创作内容均在{' '}
              <FooterLink
                href="//creativecommons.org/licenses/by-nc/4.0/legalcode"
                title="CC BY-NC 4.0"
              />{' '}
              许可下发布，相关源码及创作内容可在{' '}
              <FooterLink
                href="//github.com/openana/mirrors.xjtu.edu.cn"
                title="GitHub"
              />{' '}
              获取。根据相关法律法规，本站部分服务仅对西安交通大学校内用户提供。
            </p>
          </div>
          <div className="ml-auto px-6 mt-6">
            <Image
              src="/images/xjtuana-logo.svg"
              alt="西交网管会 Logo"
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
