import React, { Fragment } from 'react';
import Header from 'src/layouts/Header';
import Footer from 'src/layouts/Footer';

const layoutWrapper = (props) => (
  <Fragment>
    <Header />
    {props.children}
    <Footer />
  </Fragment>
);

export default layoutWrapper;
