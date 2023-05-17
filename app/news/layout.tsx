import { NewsAside } from '@/components/news-aside';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="w-full px-4 mx-auto container overflow-x-hidden">
      <div className="lg:flex lg:space-x-6">
        <div className="fixed inset-0 z-20 flex-none hidden h-full w-60 lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-60 lg:block">
          <NewsAside />
        </div>
        <div className="flex flex-auto w-full min-w-0 lg:static lg:max-h-full lg:overflow-visible">
          {children}
        </div>
      </div>
    </div>
  );
}
