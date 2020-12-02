import React, { Component, Fragment } from 'react';
import { Col, Container, Row } from 'reactstrap';
import 'src/static/stylesheets/dashboard.css';
import botIcon from 'src/static/icons/botIcon.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLaughSquint,
  faPencilAlt,
  faSadCry,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { chartData, options } from 'src/modules/contributor';
import { Bar, Pie } from 'react-chartjs-2';
import axiosClient from 'src/common/axiosClient';
import { DASHBOARD } from 'src/constants';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';

export default class DashBoard extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      loading: true,
      bot_version: null,
      done_intent: 0,
      process_intent: 0,
      reject_intent: 0,
      draft: 0,
      intent_stat_by_month: [],
      global_intent_stat: null,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    axiosClient.get(DASHBOARD).then((response) => {
      if (response.data.status) {
        const data = response.data.result_data;
        this._isMounted &&
          this.setState({
            ...data,
          });
        this.props.addToast(`Load the statistic successfully !!!`, {
          appearance: 'success',
        });
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
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChartData = (stateName) => {
    let label = [];
    let data = [];
    this.state[stateName].map((intent) => {
      label.push(intent.time);
      data.push(intent.total_done);
      return null;
    });

    return chartData(label, data, 'Number of intents done');
  };

  handlePieChartData = (stateName) => {
    let label = [];
    let data = [];
    Object.keys(this.state[stateName]).map((key) => {
      label.push(this.state[stateName][key].type);
      data.push(this.state[stateName][key].count);

      return null;
    });

    return chartData(label, data, 'Number of intents');
  };

  setLoading = (status) => {
    this._isMounted &&
      this.setState({
        loading: status,
      });
  };

  render() {
    return (
      <Fragment>
        <LoadingSpinner loading={this.state.loading} text={'Loading'} />
        <Row className="m-0 w-100 height-fit-content">
          <Row className="m-0 height-fit-content w-25">
            <Col className="pt-3 pl-3 pr-3 pb-0">
              <h4 className="text-primary">Dashboard</h4>
              <small className="text-muted">Version 1.0</small>
            </Col>
          </Row>
          {!this.state.loading && (
            <Fragment>
              <Row className="m-0 w-100 height-fit-content">
                <Col className="p-3">
                  <div className="info-box font-sm">
                    <span className="info-box-icon bg-aqua">
                      <img src={botIcon} alt="Bot Icon" className="icon" />
                    </span>
                    <div className="info-box-content">
                      <span className="info-box-text">Bot Status</span>
                      <span className="info-box-number">
                        {this.state.bot_version !== null
                          ? this.state.bot_version.name
                          : 'Not Available'}
                      </span>
                    </div>
                  </div>
                </Col>
                <Col className="p-3">
                  <div className="info-box font-sm">
                    <span className="info-box-icon bg-green">
                      <FontAwesomeIcon
                        icon={faLaughSquint}
                        className="icon"
                        color="white"
                      />
                    </span>
                    <div className="info-box-content">
                      <span className="info-box-text">Intent Done (You)</span>
                      <span className="info-box-number">
                        {this.state.done_intent}&nbsp;
                        {this.state.done_intent > 1 ? 'Intents' : 'Intent'}
                      </span>
                    </div>
                  </div>
                </Col>
                <Col className="p-3">
                  <div className="info-box font-sm">
                    <span className="info-box-icon bg-yellow">
                      <FontAwesomeIcon
                        icon={faSpinner}
                        className="icon"
                        color="white"
                        spin
                      />
                    </span>
                    <div className="info-box-content">
                      <span className="info-box-text">
                        Processing Intent (You)
                      </span>
                      <span className="info-box-number">
                        {this.state.process_intent}&nbsp;
                        {this.state.process_intent > 1 ? 'Intents' : 'Intent'}
                      </span>
                    </div>
                  </div>
                </Col>
                <Col className="p-3">
                  <div className="info-box font-sm">
                    <span className="info-box-icon bg-red">
                      <FontAwesomeIcon
                        icon={faSadCry}
                        className="icon"
                        color="white"
                      />
                    </span>
                    <div className="info-box-content">
                      <span className="info-box-text">
                        Rejected Intent (You)
                      </span>
                      <span className="info-box-number">
                        {this.state.reject_intent}&nbsp;
                        {this.state.reject_intent > 1 ? 'Intents' : 'Intent'}
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="m-0 height-fit-content w-100">
                <Col className="pr-1">
                  <div className="info-box font-sm bg-yellow text-light w-23-5">
                    <span className="info-box-icon">
                      <FontAwesomeIcon
                        icon={faPencilAlt}
                        className="icon"
                        color="white"
                      />
                    </span>
                    <div className="info-box-content">
                      <span className="info-box-text">
                        Drafted Reviews (You)
                      </span>
                      <span className="info-box-number">
                        {this.state.draft}&nbsp;
                        {this.state.draft > 1 ? 'Reviews' : 'Review'}
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
            </Fragment>
          )}

          <Row className="m-0 height-fit-content w-100">
            {this.state.intent_stat_by_month.length > 0 && (
              <Col xs="6" className="p-3">
                <Container className="cl-config-container-dashboard">
                  <Row>
                    <Col className="border-bottom mb-3">
                      <h5 className="mt-2 mb-2">
                        Intent Statistic in{' '}
                        {this.state.intent_stat_by_month.length} month
                      </h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="mt-2 text-center text-info">
                      <h6>
                        Total Intents Done from{' '}
                        {`${this.state.intent_stat_by_month[0].time} to ${
                          this.state.intent_stat_by_month[
                            this.state.intent_stat_by_month.length - 1
                          ].time
                        }`}
                      </h6>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="mt-2">
                      <Bar
                        data={this.handleChartData('intent_stat_by_month')}
                        options={options}
                      />
                    </Col>
                  </Row>
                </Container>
              </Col>
            )}
            {this.state.global_intent_stat !== null && (
              <Col xs="6" className="p-3">
                <Container className="cl-config-container-dashboard-success">
                  <Row>
                    <Col className="border-bottom mb-3">
                      <h5 className="mt-2 mb-2">Global Intent Statistic</h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="mt-2 text-center text-info">
                      <h6>Proportion Of Intents</h6>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="mt-2">
                      <Pie
                        data={this.handlePieChartData('global_intent_stat')}
                      />
                    </Col>
                  </Row>
                </Container>
              </Col>
            )}
          </Row>
        </Row>
      </Fragment>
    );
  }
}
