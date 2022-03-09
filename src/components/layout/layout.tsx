import * as React from 'react';
import { Helmet } from 'react-helmet';

import Header from './header';
import Footer from './footer';

interface Props {
  children: React.ReactNode;
  location?: Location;
}

const Layout = ({ children, location }: Props): JSX.Element => {
  return (
    <>
      <Helmet>
        <html lang="zh-Hans" className="scroll-smooth" />
      </Helmet>
      <Header location={location} />
      {children}
      <Footer location={location} />
    </>
  );
};

export default Layout;
