import React, { Component } from 'react';
import { Form, Input, Button, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';

class ReferenceModal extends Component {
  render() {
    return (
      <div className="ag-theme-alpine">
        <Modal isOpen={this.props.modal}>
          <ModalHeader>Document Reference</ModalHeader>
          <ModalBody>
            <h5>ID: {this.props.data.id}</h5>
            <Form>
              <div className="row">
                <div className="col-3">
                  <Label>Reference name: </Label>
                </div>
                <div className="col-6">
                  <Input
                    id="reference"
                    type="text"
                    value={this.props.data.reference}
                  />
                </div>
                <div className="col-3">
                  <Button >Save</Button>
                </div>
              </div>

              <div className="row">
                <div className="col-3">
                  <Label>Author: </Label>
                </div>
                <div className="col-6">
                  <Input
                    id="reference"
                    type="text"
                    value={this.props.data.author}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-3">
                  <Label>Link: </Label>
                </div>
                <div className="col-6">
                  <Input
                    id="reference"
                    type="text"
                    value={this.props.data.link}
                  />
                </div>
                <div className="col-3">
                  <Button >Delete</Button>
                </div>
              </div>

              <div className="row">
                <div className="col-3">
                  <Label>Reference type: </Label>
                </div>
                <div className="col-6">
                  <Input type="select" name="select" id="referenceType">
                    <option value="book">Book</option>
                    <option value="link">Link</option>
                  </Input>
                </div>
              </div>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ReferenceModal;