import * as React from 'react';
import { Link } from 'gatsby';

const MirrorsPage = () => {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
      <title>Home Page</title>
      <h1 className="text-3xl font-bold underline">
        Congratulations
        <br />
        <span>— you just made a Gatsby site! </span>
        🎉🎉🎉
      </h1>
      <p>
        Edit <code>src/pages/mirrors.tsx</code> to see this page update in
        real-time. 😎
      </p>
    </div>
  );
};

export default MirrorsPage;
