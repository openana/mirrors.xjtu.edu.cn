import * as React from 'react';
import { Link } from 'gatsby';

const BlankPage = () => {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
      <h1>Blank</h1>
      <Link to="/">Go home</Link>.
    </div>
  );
};

export default BlankPage;
