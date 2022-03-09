import * as React from 'react';
import { GatsbyBrowser } from 'gatsby';

import { Layout } from './src/components/layout';

import './src/styles/global.css';

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({ element }) => {
  return <Layout>{element}</Layout>;
};

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }) => {
  return element;
};
