import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Badge, CustomInput } from 'reactstrap';
import axiosClient from 'src/common/axiosClient';
import { handleInputHook } from 'src/common/handleInputChange';
import { ADMIN_TOGGLE_STATUS_TRAIN_DATA } from 'src/constants';
import { dataTypes, editStatusOfTrainData } from 'src/modules/admin';
import 'src/static/stylesheets/train.data.type.css';

const TrainDataType = (props) => {
  const [status, setStatus] = useState(props.value === 1 ? true : false);
  const context =
    props.context &&
    (props.context.componentParent
      ? props.context.componentParent
      : props.context);

  const rowData = props.data;

  const onInputChange = async (event, setState) => {
    await handleInputHook(event, setState);
    await toggleStatus();
  };

  const toggleStatus = () => {
    context.setLoading(true);
    context.props.setErrorAlert(false);
    context.props.setSuccessAlert(false);
    axiosClient
      .get(ADMIN_TOGGLE_STATUS_TRAIN_DATA(rowData.id))
      .then((response) => {
        if (response.data.status) {
          props.editStatusOfTrainData(rowData.id);
          context.props.setSuccessAlert(true);
        } else {
          context.props.setErrorAlert(true);
        }
      })
      .then(() => {
        context.setLoading(false);
        props.api && props.api.refreshCells();
      })
      .catch(() => {
        context.props.setSuccessAlert(false);
        context.props.setErrorAlert(true);
        context.setLoading(false);
      });
  };

  return (
    <div className="align-center-type">
      {props.value !== 3 ? (
        <CustomInput
          className="data-status"
          type="switch"
          id={`toggleStatus-${props.data.id}`}
          name="toggleStatus"
          label={
            <Badge
              color={dataTypes[props.value].badge}
              pill
              style={{ fontSize: '0.7rem' }}
            >
              {dataTypes[props.value].value}
            </Badge>
          }
          checked={status}
          onChange={(event) => onInputChange(event, setStatus)}
        />
      ) : (
        <Badge
          color={dataTypes[props.value].badge}
          pill
          style={{ fontSize: '0.7rem' }}
        >
          {dataTypes[props.value].value}
        </Badge>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  editStatusOfTrainData: (id) => dispatch(editStatusOfTrainData(id)),
});

export default connect(null, mapDispatchToProps)(TrainDataType);
