import React, { useEffect, useRef, useState } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from 'reactstrap';
import classnames from 'classnames';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';
import { ReportList, ReportAcceptedList, ReportRejectedList } from 'src/modules/contributor';

const Report = () => {
  const [activeTab, setActiveTab] = useState('0');
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const conRef = useRef('');
  const mounted = useRef(false);

  const toggle = (tab) => {
    mounted.current && activeTab !== tab && setActiveTab(tab);
  };

  const toggleRef = useRef(toggle);

  useEffect(() => {
    mounted.current = true;
    const changeTab = toggleRef;
    changeTab.current('1');
    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <div
      id="cl-container"
      className="cl-container container min-vh-100"
      ref={conRef}
    >
      {errorAlert && (
        <ErrorAlert
          errorAlert={errorAlert}
          errorList={errorList}
          onDismiss={() => setErrorAlert(false)}
        />
      )}
      <Row>
        <Col className="justify-content-center d-flex">
          <h5 className="mt-2 mb-2">Report List</h5>
        </Col>
      </Row>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}
            role="button"
          >
            Pending
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
            }}
            role="button"
          >
            Accepted
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => {
              toggle('3');
            }}
            role="button"
          >
            Rejected
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <div className="mt-2">
            {activeTab === '1' && (
              <ReportList
                setErrorAlert={setErrorAlert}
                setErrorList={setErrorList}
                conRef={conRef}
              />
            )}
          </div>
        </TabPane>
        <TabPane tabId="2">
          <div className="mt-2">
            {activeTab === '2' && (
              <ReportAcceptedList
                setErrorAlert={setErrorAlert}
                setErrorList={setErrorList}
                conRef={conRef}
              />
            )}
          </div>
        </TabPane>
        <TabPane tabId="3">
          <div className="mt-2">
            {activeTab === '3' && (
              <ReportRejectedList
                setErrorAlert={setErrorAlert}
                setErrorList={setErrorList}
                conRef={conRef}
              />
            )}
          </div>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Report;
