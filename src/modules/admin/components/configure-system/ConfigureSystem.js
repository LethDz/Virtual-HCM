import React, { Component, Fragment } from 'react';
import { Col, Row } from 'reactstrap';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import 'src/static/stylesheets/configure.system.css';
import {
  NlpSetting,
  ReviewProcessSetting,
  SystemSetting,
  SETTING_TYPES,
} from 'src/modules/admin';
import axiosClient from 'src/common/axiosClient';
import { ADMIN_GET_ALL_SETTING } from 'src/constants';

export default class ConfigureSystem extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      loading: true,
      errorAlert: false,
      settings: [],
    };
  }

  componentDidMount() {
    this._isMounted = true;
    axiosClient
      .get(ADMIN_GET_ALL_SETTING)
      .then((response) => {
        if (response.data.status) {
          this.setSetting(response.data.result_data);
        } else {
          this.props.addToast(
            `Unexpected error has been occurred. Please try again !\n 
            ${response.data.result_data.error_detail}.
            Please contact to Admin for support`,
            {
              appearance: 'error',
            }
          );
        }
        this.setLoading(false);
      })
      .catch(() => {
        this.setLoading(false);
        this.props.addToast(
          `Unexpected error has been occurred. Please try again !\n 
          Please contact to Admin for support`,
          {
            appearance: 'error',
          }
        );
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setLoading = (status) => {
    this._isMounted &&
      this.setState({
        loading: status,
      });
  };

  setSetting = (settings) => {
    settings.sort((settingOne, settingTwo) => {
      return settingOne.setting_id.localeCompare(settingTwo.setting_id);
    });
    this._isMounted &&
      this.setState({
        settings: settings,
      });
  };

  splitTypeOfSetting = (settings, type) => {
    let splittedSetting = [];
    settings.map((setting) => {
      if (setting.type === type) {
        splittedSetting.push(setting);
      }

      return null;
    });

    return splittedSetting;
  };

  render() {
    const { settings } = this.state;
    return (
      <Fragment>
        <LoadingSpinner loading={this.state.loading} text={'Loading'} />
        <Row className="m-0 w-100">
          {settings.length > 0 && (
            <NlpSetting
              nlpSetting={this.splitTypeOfSetting(settings, SETTING_TYPES.NLP)}
              setLoading={this.setLoading}
              addToast={this.props.addToast}
            />
          )}
          <Col className="m-0">
            {settings.length > 0 && (
              <SystemSetting
                systemSetting={this.splitTypeOfSetting(
                  settings,
                  SETTING_TYPES.SYSTEM
                )}
                setLoading={this.setLoading}
                addToast={this.props.addToast}
              />
            )}
            {settings.length > 0 && (
              <ReviewProcessSetting
                reviewSetting={this.splitTypeOfSetting(
                  settings,
                  SETTING_TYPES.REVIEW_PROCESS
                )}
                setLoading={this.setLoading}
                addToast={this.props.addToast}
              />
            )}
          </Col>
        </Row>
      </Fragment>
    );
  }
}
