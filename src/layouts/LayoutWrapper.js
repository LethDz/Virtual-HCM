import React from "react";
import Header from "src/layouts/Header";
import SideBar from "react-sidebar";
import SideBarContent from "src/layouts/SideBarContent";
import "src/static/stylesheets/layout.css";
import { ChatWidget } from "src/modules/chat";

const LayoutWrapper = (props) => {
  return (
    <SideBar
      sidebar={<SideBarContent />}
      styles={{
        sidebar: { backgroundColor: "#222D32", width: "230px" },
      }}
      docked
    >
      <Header />
      <div className="contain-body w-100 d-flex min-vh-100 position-relative">{props.children}</div>
      <ChatWidget />
    </SideBar>
  );
};

export default LayoutWrapper;
