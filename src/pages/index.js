import React, { Fragment, useEffect } from 'react';

import Gallery from '../components/Gallery';
import TopBar from '../components/TopBar';
import { setDeviceScroll } from '../utils';
import '../styles/index.css';

const IndexPage = () => {
  useEffect(() => setDeviceScroll(), []);

  return (
    <Fragment>
      <TopBar />
      <Gallery />
    </Fragment>
  );
};

export default IndexPage
