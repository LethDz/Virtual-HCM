import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationTriangle,
  faVoteYea,
} from '@fortawesome/free-solid-svg-icons';

export default class DeleteConfirmationModal extends Component {
  constructor(props) {
    super();
    this.state = {
      isOpen: false,
    };
  }

  render() {
    switch (this.props.type) {
      case 'DELETE':
        return (
          <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
            <ModalHeader toggle={this.props.toggle}>
              <FontAwesomeIcon color="red" icon={faExclamationTriangle} />{' '}
              Caution{' '}
            </ModalHeader>
            <ModalBody>
              <Col>
                <Row className="text-red">
                  Are you sure about deleting {this.props.value}?
                </Row>
              </Col>
            </ModalBody>
            <ModalFooter>
              <Button
                type="button"
                color="danger"
                onClick={this.props.confirmDelete}
              >
                <FontAwesomeIcon icon={faVoteYea} />
                &nbsp;Confirm
              </Button>
              <Button type="button" onClick={this.props.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        );
      case 'DISABLE':
        return (
          <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
            <ModalHeader toggle={this.props.toggle}>
              <FontAwesomeIcon color="red" icon={faExclamationTriangle} />{' '}
              Caution{' '}
            </ModalHeader>
            <ModalBody>
              <Col>
                <Row className="text-red">
                  Are you sure about disabling {this.props.value}?
                </Row>
              </Col>
            </ModalBody>
            <ModalFooter>
              <Button
                type="button"
                color="danger"
                onClick={this.props.confirmDelete}
              >
                <FontAwesomeIcon icon={faVoteYea} />
                &nbsp;Confirm
              </Button>
              <Button type="button" onClick={this.props.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        );
      default:
        return '';
    }
  }
}
