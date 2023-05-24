'use client';

import { useState, useEffect } from 'react';

import { StatusTable } from '@/components/status-table';

function Status() {
  const [mirrors, setMirrors] = useState<any[]>([]);
  const [counter, setCounter] = useState(true);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/mirrors.json')
      .then((res) => res.json())
      .then((data) => {
        setMirrors(data);
        setLoading(false);
      });
    const interval = setInterval(() => {
      setCounter(!counter);
    }, 30000);
    return () => clearInterval(interval);
  }, [counter]);

  return <StatusTable isLoading={isLoading} mirrors={mirrors} />;
}

export function StatusMain() {
  return (
    <div className="pt-6 lg:pt-8">
      <div className="md:flex md:items-center md:justify-between pb-4">
        <div className="flex items-center pb-4 md:pb-0">
          <div className="font-medium text-xl">
            同步状态
          </div>
        </div>
      </div>
      <Status />
    </div>
  );
}
