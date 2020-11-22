import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import axiosClient from 'src/common/axiosClient';
import { ADMIN_CHANGE_STATUS_USER } from 'src/constants';
import { editStatusOfUser } from 'src/modules/admin';
import 'src/static/stylesheets/btn.change.status.css';

const BtnChangeStatus = (props) => {
  const rowData = props.data;
  const context =
    props.context &&
    (props.context.componentParent
      ? props.context.componentParent
      : props.context);
  const changeStatus = () => {
    context.setLoading(true);
    context.setErrorAlert(false);
    context.setSuccessAlert(false);
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

  return (
    <div className={props.editPage ? '' : 'align-center-table'}>
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
