export type SiteConfig = {
  title: string;
  title_en: string;
  header: SiteHeaderConfig;
  footer: SiteFooterConfig;
};

export type SiteHeaderConfig = {
  pages: {
    title: string;
    href: string;
    activeSelector: string;
  }[];
};

export type SiteFooterConfig = {
  logo: {
    src: string;
    alt: string;
  };
  description: any;
  copyright: {
    title: string;
    href: string;
  };
  links: {
    title: string;
    href: string;
  }[];
};
