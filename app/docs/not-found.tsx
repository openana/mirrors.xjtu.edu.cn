import { FileQuestion } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <FileQuestion className="h-24 w-24 text-slate-700 dark:text-rose-100" />
      <h2 className="text-3xl font-bold text-slate-700 dark:text-rose-50">
        Docs not found
      </h2>
      <div className="flex flex-row space-x-2">
        <Link href="/docs/" title="All Docs" />
        <Link href="/" title="Home" />
      </div>
    </div>
  );
}
