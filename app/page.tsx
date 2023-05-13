'use client';

import { useState, useEffect } from 'react';
import { allNewsPosts } from 'contentlayer/generated';

import MirrorsLayout from '@/components/MirrorsLayout';
import MirrorsAsideLayout from '@/components/MirrorsAsideLayout';

function Mirrors() {
  const [mirrors, setMirrors] = useState([]);
  const [counter, setCounter] = useState(true);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/mirrors.json')
      .then((res) => res.json())
      .then((data) => {
        // data.push({
        //   name: 'test',
        //   status: 'mirrorz',
        //   last_update_ts: -1,
        // })
        // data.push({
        //   name: 'github.com/torvalds/linux.git',
        //   status: 'git',
        //   last_update_ts: -1,
        // })
        // data.push({
        //   name: 'goproxy',
        //   status: 'proxy',
        //   last_update_ts: -1,
        // })
        // data.push({
        //   name: 'docker.io',
        //   status: 'proxy',
        //   last_update_ts: -1,
        // })
        // data.push({
        //   name: 'ghcr.io',
        //   status: 'proxy',
        //   last_update_ts: -1,
        // })
        data.push({
          name: 'pypi',
          status: 'proxy',
          last_update_ts: -1,
        });
        setMirrors(data);
        setLoading(false);
      });
    const interval = setInterval(() => {
      setCounter(!counter);
    }, 300000);
    return () => clearInterval(interval);
  }, [counter]);

  return <MirrorsLayout isLoading={isLoading} mirrors={mirrors} />;
}

function MirrorsAside() {
  return <MirrorsAsideLayout allNewsPosts={allNewsPosts} />;
}

export default function Page() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl w-full flex mx-auto p-4 space-x-6">
        <Mirrors />
        <MirrorsAside />
      </div>
    </div>
  );
}
