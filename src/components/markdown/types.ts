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
        url: string;
        title: string;
        items?: {
          url: string;
          title: string;
          items?: {
            url: string;
            title: string;
          }[];
        }[];
      }[];
    };
  };
}
