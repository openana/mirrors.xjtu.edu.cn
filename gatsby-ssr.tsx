import * as React from 'react';
import { GatsbySSR } from 'gatsby';

import Layout from './src/components/layout';

import './src/styles/global.css';

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({ element }) => {
  return <Layout>{element}</Layout>;
};

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => {
  return element;
};
