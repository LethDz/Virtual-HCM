import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import axiosClient from 'src/common/axiosClient';
import { ADMIN_CHANGE_STATUS_USER } from 'src/constants';
import { editStatusOfUser } from 'src/modules/admin';
import DeleteConfirmationModal from 'src/common/DeleteConfirmationModal';
import 'src/static/stylesheets/btn.change.status.css';

const BtnChangeStatus = (props) => {
  const [isOpenDeleteConfirmation, setIsOpenDeleteConfirmation] = useState(
    false
  );
  const rowData = props.data;
  const context =
    props.context &&
    (props.context.componentParent
      ? props.context.componentParent
      : props.context);
  const changeStatus = () => {
    if (props.value) {
      openModal();
    } else {
      executeAction();
    }
  };

  const openModal = () => {
    setIsOpenDeleteConfirmation(true);
  };

  const executeAction = () => {
    context.setLoading(true);
    context.setErrorAlert(false);
    context.setSuccessAlert(false);
    setIsOpenDeleteConfirmation(false);
    axiosClient
      .get(ADMIN_CHANGE_STATUS_USER(rowData.user_id))
      .then((response) => {
        if (response.data.status) {
          props.editStatusOfUser(rowData.user_id);
          context.setSuccessAlert(true);
          context.setAccountStatus && context.setAccountStatus(!props.value);
        } else {
          context.setErrorAlert(true);
        }
      })
      .then(() => {
        context.setLoading(false);
        props.api && props.api.refreshCells();
      })
      .catch(() => {
        context.setSuccessAlert(false);
        context.setErrorAlert(true);
        context.setLoading(false);
      });
  };

  const toggleDeleteConfirmation = () => {
    setIsOpenDeleteConfirmation(!isOpenDeleteConfirmation);
  };

  return (
    <div className={props.editPage ? '' : 'align-center-table'}>
      {isOpenDeleteConfirmation && (
        <DeleteConfirmationModal
          type="DISABLE"
          isOpen={isOpenDeleteConfirmation}
          toggle={toggleDeleteConfirmation}
          value="test"
          confirmDelete={executeAction}
        />
      )}
      <span className={`${props.value ? 'text-success' : 'text-danger'} mr-1`}>
        <FontAwesomeIcon
          icon={props.value ? faCheck : faTimes}
          color={props.value ? 'green' : 'red'}
        />{' '}
        {props.value ? 'Active' : 'Disabled'}
      </span>
      &nbsp;
      {rowData && !rowData.admin && (
        <Button
          color={props.value ? 'danger' : 'success'}
          size="sm"
          onClick={changeStatus}
          className="ml-1"
        >
          <FontAwesomeIcon
            icon={props.value ? faTimes : faCheck}
            color="white"
          />
          &nbsp; {props.value ? 'Disable' : 'Active'}
        </Button>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  editStatusOfUser: (id) => dispatch(editStatusOfUser(id)),
});

export default connect(null, mapDispatchToProps)(BtnChangeStatus);
