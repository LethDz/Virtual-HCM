import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import axiosClient from 'src/common/axiosClient';
import { ADMIN_CHANGE_STATUS_USER } from 'src/constants';
import { editStatusOfUser } from 'src/modules/admin';

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
          context.setContributorsList && context.setContributorsList([]);
          context.setSuccessAlert(true);
          context.setAccountStatus && context.setAccountStatus(!props.value);
        } else {
          context.setErrorAlert(true);
        }
      })
      .then(() => {
        context.setLoading(false);
        context.setContributorsList &&
          context.setContributorsList(context.props.contributors);
      })
      .catch(() => {
        context.setSuccessAlert(false);
        context.setErrorAlert(true);
        context.setLoading(false);
      });
  };

  return (
    <Fragment>
      <span className={props.value ? 'text-success' : 'text-danger'}>
        <FontAwesomeIcon
          icon={props.value ? faCheck : faTimes}
          color={props.value ? 'green' : 'red'}
        />{' '}
        {props.value ? 'Active' : 'Disabled'}
      </span>
      &nbsp;
      <Button
        color={props.value ? 'danger' : 'success'}
        size="sm"
        onClick={changeStatus}
      >
        <FontAwesomeIcon icon={props.value ? faTimes : faCheck} color="white" />
        &nbsp; {props.value ? 'Disable' : 'Active'}
      </Button>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  editStatusOfUser: (id) => dispatch(editStatusOfUser(id)),
});

export default connect(null, mapDispatchToProps)(BtnChangeStatus);
