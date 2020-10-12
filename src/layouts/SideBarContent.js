import React from "react";
import SideBarAdminContent from "src/layouts/SideBarAdminContent"
import SideBarContributorContent from "src/layouts/SideBarContributorContent";
import { ROLE_ADMIN, ROLE_CONTRIBUTOR } from "src/constants";

const switchLayout = (user) => {
  if (user === ROLE_ADMIN) {
    return <SideBarAdminContent />;
  } else if (user === ROLE_CONTRIBUTOR) {
    return <SideBarContributorContent />;
  }
};

const SideBarContent = () => {
  return (
    <div className="sidebar">
      <div className="align-center">
        <h2 className="sidebar-item">Profile</h2>
      </div>
      {switchLayout(ROLE_CONTRIBUTOR)}
    </div>
  );
};

export default SideBarContent;
