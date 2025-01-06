import { SiteConfig } from '@/config/types';

export const siteConfig: SiteConfig = {
  title: '西安交通大学软件镜像站',
  title_en: 'XJTU Software Mirrors',
  header: {
    pages: [
      { title: '主页', href: '/', activeSelector: '/' },
      {
        title: '文档',
        href: '/docs/getting-started/quickstart/',
        activeSelector: '/docs/',
      },
      { title: '新闻公告', href: '/news/latest/', activeSelector: '/news/' },
      // { title: '更多服务', href: '/services/', activeSelector: '/services/' },
      { title: '关于', href: '/about/', activeSelector: '/about/' },
    ],
  },
  footer: {
    logo: { src: '/images/xjtuana-logo.svg', alt: 'XJTUANA Logo' },
    description: `西安交通大学软件镜像站由 [西安交通大学网络信息中心](//nic.xjtu.edu.cn) 提供相关设备和资源支持，由 [西安交通大学学生网络管理协会](//xjtuana.com) 进行维护和运营。

西安交通大学学生网络管理协会（简称西交网管会，XJTUANA）是由西安交通大学热爱网络技术，开源软件和校园信息化项目开发的同学们组成的学生科技类社团。

除特殊注明外，本站源码在 [Apache License 2.0](//github.com/openana/app-mirrors/blob/main/LICENSE) 许可下发布，本站创作内容均在 [CC BY-NC-SA 4.0](//creativecommons.org/licenses/by-nc-sa/4.0/legalcode) 许可下发布，相关源码及创作内容可在 [GitHub](//github.com/openana/app-mirrors) 获取。根据相关法律法规以及合规性要求，本站部分服务仅对西安交通大学校内用户提供。`,
    copyright: {
      title: 'XJTUANA',
      href: '//xjtuana.com',
    },
    links: [
      { title: '关于', href: '/about/' },
      { title: '同步状态', href: '/status/' },
      // { title: '隐私政策', href: '/privacy-policy/' },
      // { title: '服务条款', href: '/terms-of-service/' },
    ],
  },
};
