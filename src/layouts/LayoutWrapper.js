import React, { Fragment, useState } from "react";
import Header from "src/layouts/Header";
import Footer from "src/layouts/Footer";
import SideBar from "react-sidebar";
import SideBarContent from "src/layouts/SideBarContent";

const LayoutWrapper = (props) => {
  const [isOpen, toggle] = useState(false);

  const closeSideBar = () => {
    toggle(false);
  };

  return (
    <Fragment>
      <SideBar
        sidebar={<SideBarContent />}
        open={isOpen}
        onSetOpen={closeSideBar}
        styles={{ sidebar: { backgroundColor: "#343A40" }}}
      >
        <Header toggleSideBar={toggle} />
        {props.children}
        <Footer />
      </SideBar>
    </Fragment>
  );
};

export default LayoutWrapper;
