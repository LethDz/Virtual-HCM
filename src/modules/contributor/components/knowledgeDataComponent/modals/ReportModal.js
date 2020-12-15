import React, { Component, Fragment } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMinimize } from '@fortawesome/free-solid-svg-icons';

import {
  Popover,
  PopoverHeader,
  PopoverBody,
  Row,
  Col,
  Badge,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from 'reactstrap';
import { reportType } from 'src/modules/contributor/index';
import { handleInputChange } from 'src/common/handleInputChange';

class ReportModal extends Component {
  _isMounted = false;
  constructor(props) {
    super();
    this.state = {
      note: props.noteValue,
      errorAlert: false,
      successAlert: false,
    };
  }

  handleInput = (event) => {
    this.setState({ errorAlert: false });
    handleInputChange(event, this);
  };

  componentDidMount = () => {
    this._isMounted = true;
    this.setState({ errorAlert: this.props.feedBackCheck });
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  toggleThisModal = () => {
    this.props.toggle();
  };

  saveNote = () => {
    if (this.state.note.trim() !== '') {
      this.props.saveNote(this.state.note);
      this._isMounted && this.setState({ errorAlert: false });
      this._isMounted && this.setState({ successAlert: true });
    } else {
      this._isMounted && this.setState({ successAlert: false });
      this._isMounted && this.setState({ errorAlert: true });
    }
  };

  renderReport = () => {
    const report = this.props.reportDetail;
    switch (report.report_type) {
      case 1:
        return (
          <Fragment>
            <Row className="custom-border">
              <Col className="col-3 font-weight-bold">Report type: </Col>
              <Col className="col-9">
                <h5>
                  <Badge
                    color={`${
                      reportType[report.report_type] === reportType[1]
                        ? 'primary'
                        : 'success'
                    }`}
                  >
                    {reportType[report.report_type]}
                  </Badge>
                </h5>
              </Col>
            </Row>
            <FormGroup className="mt-3">
              <Label className="font-weight-bold">Question: </Label>
              <div className="message">{report.question}</div>
            </FormGroup>
            <FormGroup className="custom-border">
              <Label className="font-weight-bold">Bot answer: </Label>
              <div className="message">{report.bot_answer}</div>
            </FormGroup>
            <Row>
              <Col className="col-3 font-weight-bold">Reporter Data:</Col>
              <Col className="col-9 text-break">{report.report_data}</Col>
            </Row>
          </Fragment>
        );
      case 2:
        return (
          <Fragment>
            <Row className="custom-border">
              <Col className="col-3 font-weight-bold">Report type: </Col>
              <Col className="col-9">
                <h5>
                  <Badge
                    color={`${
                      reportType[report.report_type] === reportType[1]
                        ? 'primary'
                        : 'success'
                    }`}
                  >
                    {reportType[report.report_type]}
                  </Badge>
                </h5>
              </Col>
            </Row>
            <Row>
              <Col className="col-3 font-weight-bold">Reporter Data:</Col>
              <Col className="col-9 text-break">{report.report_data}</Col>
            </Row>
          </Fragment>
        );
      default:
    }
  };

  render() {
    return (
      <Popover
        placement="bottom"
        isOpen={this.props.isOpen}
        target={this.props.buttonId}
        toggle={this.props.toggle}
        className="popover-width"
        hideArrow={true}
        flip={false}
      >
        <PopoverHeader>
          <Row>
            <Col>Report</Col>
            <Col xs="auto" onClick={this.toggleThisModal}>
              <FontAwesomeIcon icon={faWindowMinimize} />
            </Col>
          </Row>
        </PopoverHeader>
        <PopoverBody>
          <Col>{this.renderReport()}</Col>
          <FormGroup>
            <Input
              className="mt-3"
              name="note"
              type="textarea"
              onChange={this.handleInput}
              value={this.state.note}
              placeholder="Enter what have you changed here"
              invalid={this.state.errorAlert}
              valid={this.state.successAlert}
            />
            {this.state.errorAlert && (
              <FormFeedback>Please note what you have changed</FormFeedback>
            )}
            {this.state.successAlert && (
              <FormFeedback valid>Save successful</FormFeedback>
            )}

            <div className="d-flex justify-content-end mt-2">
              <Button type="button" color="success" onClick={this.saveNote}>
                Save
              </Button>
            </div>
          </FormGroup>
        </PopoverBody>
      </Popover>
    );
  }
}

export default ReportModal;
