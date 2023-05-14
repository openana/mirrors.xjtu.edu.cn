'use client';

import '@/styles/markdown.css';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { MDXComponents } from '@/components/mdx-components';

type MDXContentProps = {
  code: string;
};

export function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code);

  return (
    <article className="prose prose-slate rose-headings:drop-shadow-sm">
      <Component components={MDXComponents} />
    </article>
  );
}
