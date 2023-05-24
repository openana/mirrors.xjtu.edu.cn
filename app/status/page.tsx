import { StatusMain } from '@/components/status-main';

export default function Page() {
  return (
    <div className="w-full px-4 mx-auto container overflow-x-hidden">
      <div className="lg:flex lg:space-x-6">
        <div className="flex-auto w-full min-w-0 lg:static lg:max-h-full lg:overflow-visible">
          <StatusMain />
        </div>
      </div>
    </div>
  );
}
