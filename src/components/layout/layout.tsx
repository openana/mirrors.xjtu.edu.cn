import * as React from 'react';
import { Link } from 'gatsby';

import Header from './header';
import Footer from './footer';

interface Props {
  children: React.ReactNode;
  location?: Location;
}

const Layout = ({ children, location }: Props): JSX.Element => {
  return (
    <>
      <Header location={location} />
      {children}
      <Footer location={location} />
    </>
  );
};

export default Layout;
