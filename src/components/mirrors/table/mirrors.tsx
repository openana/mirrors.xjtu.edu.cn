import * as React from 'react';
import path from 'path';

import { BsCloudFill, BsSortAlphaDown } from 'react-icons/bs';

import { IMirrors, IMirrorsData } from './types';
import MirrorsTableRow from './mirrorsRow';

const MirrorsTable: React.FC<{ pathname: string, mirrors: IMirrors; setMirrors: any }> = ({
  pathname,
  mirrors,
  setMirrors,
}) => {
  const [count, setCount] = React.useState(true);

  const setMirrorsData = (data: any[]) => {
    setMirrors({
      data: mirrors.data.map((v: IMirrorsData) => {
        const x = data.find(
          (e: IMirrorsData) =>
            v.id && e.name.toLowerCase() === v.id.toLowerCase(),
        );
        if (x) {
          v.status = x.status;
          v.started_at =
            // new line please!
            x.last_started_ts && new Date(x.last_started_ts * 1e3);
          v.updated_at =
            // new line please!
            x.last_update_ts && new Date(x.last_update_ts * 1e3);
          v.success_at =
            // new line please!
            x.last_ended_ts && new Date(x.last_ended_ts * 1e3);
          v.nxtsync_at =
            x.next_schedule_ts && new Date(x.next_schedule_ts * 1e3);
        }
        return v;
      }),
      error: null,
    });
  };

  const FETCH_ENDPOINT = (process.env.GATSBY_API_ENDPOINT || '/api') + pathname;
  const FETCH_INTERVAL = 300000; // 5 minutes

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount(!count);
    }, FETCH_INTERVAL);
    const raw = localStorage.getItem('fetch:cache:' + FETCH_ENDPOINT);
    if (raw) {
      const cache: { data: IMirrorsData[]; time: number } = JSON.parse(raw);
      if (Date.now() - cache.time < FETCH_INTERVAL) {
        console.log('using cache', cache);
        setMirrorsData(cache.data);
        return () => clearInterval(interval);
      }
    }
    fetch(FETCH_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        console.log('saving cache', { data: data, time: Date.now() });
        localStorage.setItem(
          'fetch:cache:' + FETCH_ENDPOINT,
          JSON.stringify({
            data: data,
            time: Date.now(),
          }),
        );
        setMirrorsData(data);
      })
      .catch((err) => {
        setMirrors({
          data: mirrors.data,
          error: err,
        });
      });
    return () => clearInterval(interval);
  }, [count]);

  return (
    <table className="flex flex-col text-sm">
      <thead className="flex flex-col border-b font-medium text-slate-600">
        <tr className="flex p-2 space-x-2">
          <th className="flex-none w-4 text-left">
            <BsCloudFill className="inline text-base h-4 mb-0.5" />
          </th>
          <th className="flex-none basis-1/5 text-left">
            镜像名称
            <BsSortAlphaDown className="inline text-base h-4 mb-0.5" />
          </th>
          <th className="flex-auto overflow-hidden text-left">镜像介绍</th>
          <th className="flex-none w-32 text-right">同步状态</th>
        </tr>
      </thead>
      <tbody className="flex flex-col text-slate-600">
        {mirrors.data.map((item, key) => (
          <MirrorsTableRow item={item} key={key} />
        ))}
      </tbody>
    </table>
  );
};

export default MirrorsTable;
