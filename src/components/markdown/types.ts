export interface IMdxData {
  mdx: {
    frontmatter: {
      title: string;
      description: string;
    };
    body: any;
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
