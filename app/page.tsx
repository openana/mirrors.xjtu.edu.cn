import { HomeMain } from '@/components/home-main';
import { HomeAside } from '@/components/home-aside';

export default function Page() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl w-full flex mx-auto p-4 space-x-6">
        <div className="py-6 basis-3/4">
          <HomeMain />
        </div>
        <div className="flex-initial py-6 w-80">
          <HomeAside />
        </div>
      </div>
    </div>
  );
}
