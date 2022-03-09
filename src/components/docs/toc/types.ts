export interface ITableOfContents {
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
}
