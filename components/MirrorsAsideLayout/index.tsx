import { compareDesc } from 'date-fns';
import {
  NewspaperIcon,
  DownloadCloudIcon,
  Contact2Icon,
  Link2Icon,
} from 'lucide-react';
import { NewsPost } from '@/.contentlayer/generated';

export default function MirrorsAsideLayout({
  allNewsPosts,
}: {
  allNewsPosts: NewsPost[];
}) {
  const latestNewsPosts = allNewsPosts
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 5);

  return (
    <div className="flex-initial py-6 w-80">
      <div className="flex flex-col space-y-4">
        <div>
          <div className="font-medium text-lg">
            <NewspaperIcon className="inline -mt-0.5" /> 最新通知
          </div>
          <div className="pt-2">
            <ul>
              {latestNewsPosts.map((post) => (
                <li key={post.slug}>{post.title}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <div className="font-medium text-lg">
            <DownloadCloudIcon className="inline -mt-0.5" /> 资源下载
          </div>
          <div className="pt-2">
            <ul>
              <li>???</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="font-medium text-lg">
            <Contact2Icon className="inline -mt-0.5" /> 联系我们
          </div>
          <div className="pt-2">
            <ul>
              <li>???</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="font-medium text-lg">
            <Link2Icon className="inline -mt-0.5" /> 相关链接
          </div>
          <div className="pt-2">
            <ul>
              <li>???</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
