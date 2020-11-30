import React from 'react';
import SideBarAdminContent from 'src/layouts/SideBarAdminContent';
import SideBarContributorContent from 'src/layouts/SideBarContributorContent';
import { imgBase64, ROLE_ADMIN, ROLE_CONTRIBUTOR } from 'src/constants';
import {
  getTheCurrentUserRole,
  getUserData,
} from 'src/common/authorizationChecking';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import avatar from 'src/static/images/img_avatar.png';
import { UserLink } from 'src/common/UserLink';

const switchLayout = (role) => {
  if (role === ROLE_ADMIN) {
    return <SideBarAdminContent />;
  }
  if (role === ROLE_CONTRIBUTOR) {
    return <SideBarContributorContent />;
  }
};

const SideBarContent = () => {
  const user = getUserData();
  return (
    <div className="side-bar-content">
      <div className="align-center side-navbar">
        <h4 className="sidebar-title">
          <b>{getTheCurrentUserRole()}</b>
        </h4>
      </div>
      <div className="profile">
        <div className="avatar-image">
          <img
            className="img-circle"
            alt="User-Avatar"
            src={user.avatar ? imgBase64(user.avatar) : avatar}
          ></img>
        </div>
        <div className="user-name">
          <p>
            <UserLink data={user} value={user.username} />
          </p>
          <p>
            <FontAwesomeIcon icon={faCircle} color="green" />
            &nbsp;Online
          </p>
        </div>
      </div>
      <div className="side-navbar-title">Main Navigation</div>
      <div className="sidebar">{switchLayout(getTheCurrentUserRole())}</div>
    </div>
  );
};

export default SideBarContent;
