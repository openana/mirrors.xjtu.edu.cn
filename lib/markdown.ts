import { remark } from 'remark';
import remarkHtml from 'remark-html';

export const markdownToHtml = (
  content: string,
  replace: (content: string) => string = (content) => content,
) => replace(remark().use(remarkHtml).processSync(content).toString());
