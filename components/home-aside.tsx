import { compareDesc, formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import {
  NewspaperIcon,
  DownloadCloudIcon,
  Contact2Icon,
  Link2Icon,
} from 'lucide-react';
import { allNewsPosts } from 'contentlayer/generated';

const _formatDistanceToNow = (date: Date, options?: any) => {
  const result = formatDistanceToNow(new Date(date), {
    locale: zhCN,
    ...options,
  });
  if (!result.endsWith('前')) return result + '后';
  return result;
};

export function HomeAside() {
  const latestNewsPosts = allNewsPosts
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 5);
  return (
    <div className="pt-6 lg:pt-8">
      <div className="flex flex-col space-y-4">
        <div>
          <div className="font-medium text-xl">
            <NewspaperIcon className="inline -mt-1" /> 最新通知
          </div>
          <div className="pt-2">
            <ul>
              {latestNewsPosts.map((post) => (
                <li key={post.slug}>
                  {post.title}{' '}
                  <span className="text-xs text-gray-400">
                    - 发布于 {_formatDistanceToNow(new Date(post.date))}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <div className="font-medium text-xl">
            <DownloadCloudIcon className="inline -mt-1" /> 资源下载
          </div>
          <div className="pt-2">
            <ul>
              <li>???</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="font-medium text-xl">
            <Contact2Icon className="inline -mt-1" /> 联系我们
          </div>
          <div className="pt-2">
            <ul>
              <li>???</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="font-medium text-xl">
            <Link2Icon className="inline -mt-1" /> 相关链接
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
