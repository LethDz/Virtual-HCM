import React from 'react';
import Header from 'src/layouts/Header';
import SideBar from 'react-sidebar';
import SideBarContent from 'src/layouts/SideBarContent';
import 'src/static/stylesheets/layout.css';

const LayoutWrapper = (props) => {
  return (
    <SideBar
      sidebar={<SideBarContent />}
      styles={{ sidebar: { backgroundColor: '#222D32', width: '230px' } }}
      docked
    >
      <div className="wrapper">
        <Header />
        <div className="contain-body background-color">{props.children}</div>
      </div>
    </SideBar>
  );
};

export default LayoutWrapper;
