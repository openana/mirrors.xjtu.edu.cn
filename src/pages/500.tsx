import * as React from 'react';
import { Link } from 'gatsby';

const InternalServerErrorPage = () => {
  return (
    <main>
      <h1>Internal Server Error</h1>
      <Link to="/">Go home</Link>.
    </main>
  );
};

export default InternalServerErrorPage;
