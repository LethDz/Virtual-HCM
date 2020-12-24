import React, { useEffect, useRef, useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';
import {
  AvailableKnowledgeDataList,
  OtherKnowledgeDataList,
} from 'src/modules/contributor';

const SelectKnowledgeData = (props) => {
  const [activeTab, setActiveTab] = useState('0');
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const conRef = useRef('');
  const mounted = useRef(false);

  const toggle = (tab) => {
    mounted.current && activeTab !== tab && setActiveTab(tab);
  };

  const toggleDetail = () => {
    props.toggleDetailModal();
  };

  const addToast = () => {
    props.addToast();
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
    <div className='min-vh-50' ref={conRef}>
      {errorAlert && (
        <ErrorAlert
          errorAlert={errorAlert}
          errorList={errorList}
          onDismiss={() => setErrorAlert(false)}
        />
      )}
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}
            role='button'
          >
            My knowledge data
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
            }}
            role='button'
          >
            Other people's knowledge data
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId='1'>
          <div className='mt-2'>
            {activeTab === '1' && (
              <AvailableKnowledgeDataList
                setErrorAlert={setErrorAlert}
                setErrorList={setErrorList}
                conRef={conRef}
                intents={props.availableIntents}
                report={props.report}
              />
            )}
          </div>
        </TabPane>
        <TabPane tabId='2'>
          <div className='mt-2'>
            {activeTab === '2' && (
              <OtherKnowledgeDataList
                setErrorAlert={setErrorAlert}
                setErrorList={setErrorList}
                conRef={conRef}
                intents={props.otherIntents}
                report={props.report}
                toggleDetailModal={toggleDetail}
                addToast={addToast}
              />
            )}
          </div>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default SelectKnowledgeData;
