export interface IMdxData {
  mdx: {
    frontmatter: {
      title: string;
      description: string;
    };
    body: any;
    slug: string;
    excerpt: string;
    tableOfContents: {
      items?: {
        title: string;
        url: string;
        items?: {
          title: string;
          url: string;
          items?: {
            title: string;
            url: string;
          }[];
        }[];
      }[];
    };
  };
}
