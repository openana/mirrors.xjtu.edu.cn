import Link from 'next/link';

export default function Page() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl w-full flex mx-auto p-4 space-x-6">
        <div>News</div>
        <Link href="/news/2023-05-16/maintainance-and-service-upgrade/">
          maintainance-and-service-upgrade
        </Link>
      </div>
    </div>
  );
}
