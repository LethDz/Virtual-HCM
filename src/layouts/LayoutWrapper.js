import React from 'react';
import Header from 'src/layouts/Header';
import SideBar from 'react-sidebar';
import SideBarContent from 'src/layouts/SideBarContent';
import 'src/static/stylesheets/layout.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';

const LayoutWrapper = (props) => {
  return (
    <SideBar
      sidebar={<SideBarContent />}
      styles={{ sidebar: { backgroundColor: '#222D32', width: '230px' } }}
      docked
    >
      <div className="wrapper">
        <Header />
        <div className="contain-body">{props.children}</div>
      </div>
      <div className="chat-bubble-position">
        <div className="chat-bubble-icon">
          <FontAwesomeIcon size="2x" color="white" icon={faCommentDots} />
        </div>
      </div>
    </SideBar>
  );
};

export default LayoutWrapper;
