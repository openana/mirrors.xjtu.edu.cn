'use client';

import { useMDXComponent } from 'next-contentlayer/hooks';

import { MDXComponents } from '@/components/mdx-components';

type MDXContentProps = {
  code: string;
};

export function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code);

  return (
    <div>
      <Component components={MDXComponents} />
    </div>
  );
}
