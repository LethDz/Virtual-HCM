import React, { Fragment } from "react";
import Header from "src/layouts/Header";
import Footer from "src/layouts/Footer";
import SideBar from "react-sidebar";
import SideBarContent from "src/layouts/SideBarContent";
import "src/static/stylesheets/layout.css"

const LayoutWrapper = (props) => {
  return (
    <Fragment>
      <SideBar
        sidebar={<SideBarContent />}
        styles={{ sidebar: { backgroundColor: "#363b41" } }}
        docked
      >
        <div className="wrapper">
          <Header />
          <div className="contain-body">{props.children}</div>
        </div>
        
        <Footer />
      </SideBar>
    </Fragment>
  );
};

export default LayoutWrapper;
