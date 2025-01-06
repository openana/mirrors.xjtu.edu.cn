import { HomeMain } from '@/components/home-main';
import { HomeAside } from '@/components/home-aside';

export default function Page() {
  return (
    <div className="w-full px-4 mx-auto container overflow-x-hidden">
      <div className="lg:flex lg:space-x-6">
        <div className="flex-auto w-full min-w-0 lg:static lg:max-h-full lg:overflow-visible">
          <HomeMain />
        </div>
        <div className="flex-initial w-96">
          <HomeAside />
        </div>
      </div>
    </div>
  );
}
