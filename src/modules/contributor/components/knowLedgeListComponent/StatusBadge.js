import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Badge, Input } from 'reactstrap';
import { getUserData } from 'src/common/authorizationChecking';
import axiosClient from 'src/common/axiosClient';
import { handleInputChange } from 'src/common/handleInputChange';
import { KNOWLEDGE_DATA_CHANGE_STATUS } from 'src/constants';

import {
  idOfStatusOfKD,
  statusOfKD,
  statusOfKDColor,
  changeStatusOfKnowledgeData,
  displayStringOfStatusOfKD,
} from 'src/modules/contributor';

class StatusBadge extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      status: '',
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
    const status = this.props.data.status;
    this.setState({
      status: status,
    });
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  onChangeStatus = async (event) => {
    await handleInputChange(event, this);
    if (this.state.status === idOfStatusOfKD['DONE']) {
      return;
    }
    this.props.context.componentParent.setLoading(true);
    this.props.context.componentParent.setErrorAlert(false);
    const data = {
      knowledge_data_id: this.props.data.id,
      status: parseInt(this.state.status),
    };
    axiosClient
      .post(KNOWLEDGE_DATA_CHANGE_STATUS, data)
      .then((response) => {
        if (!response?.data?.status) {
          this.props.context.componentParent.setErrorAlert(true);
          this.props.context.componentParent.setErrorList(
            response?.data?.messages
          );
          this._isMounted &&
            this.setState({
              status: this.props.data.status,
            });
        }
        this.props.context.componentParent.setLoading(false);
      })
      .then(() => {})
      .catch(() => {
        this._isMounted &&
          this.setState({
            status: this.props.data.status,
          });
        this.props.context.componentParent.setLoading(false);
        this.props.context.componentParent.setErrorAlert(true);
      });
  };

  toggle = () => {
    this._isMounted &&
      this.setState({
        dropdownOpen: !this.state.dropdownOpen,
      });
  };

  render() {
    const user = getUserData();
    return (
      <Fragment>
        {!user.admin ? (
          <Badge
            className="mt-2 badge-width"
            color={statusOfKDColor[this.state.status]}
          >
            {displayStringOfStatusOfKD[this.state.status]}
          </Badge>
        ) : (
          <Input
            bsSize="sm"
            type="select"
            name="status"
            id="status"
            value={this.state.status}
            onChange={this.onChangeStatus}
            className={`mt-1 btn-${statusOfKDColor[this.state.status]}`}
          >
            <option
              disabled
              style={{
                backgroundColor: 'whitesmoke',
                color: 'gray',
              }}
            >
              Select status
            </option>
            {Object.keys(idOfStatusOfKD).map((status, index) => (
              <option
                value={idOfStatusOfKD[status]}
                key={index}
                disabled={idOfStatusOfKD[status] === idOfStatusOfKD['DONE']}
                style={{
                  backgroundColor:
                    idOfStatusOfKD[status] === idOfStatusOfKD['DONE']
                      ? 'whitesmoke'
                      : 'white',
                  color:
                    idOfStatusOfKD[status] === idOfStatusOfKD['DONE']
                      ? 'gray'
                      : 'black',
                }}
              >
                {statusOfKD[status]}
              </option>
            ))}
          </Input>
        )}
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeStatusOfData: (data) => dispatch(changeStatusOfKnowledgeData(data)),
});

export default connect(null, mapDispatchToProps)(StatusBadge);
