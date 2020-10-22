import React, { Component } from 'react';
import { Form, Input, Button, FormGroup, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';

class ReferenceModal extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      data: {
        id: 1,
        name: 'Ho Chi Minh Toan Tap 1',
        author: 'Ho Chi Minh',
        link: 'hochiminh.vn'
      }
    }
  }

  render() {
    return (
      <div className="ag-theme-alpine">
        <Modal isOpen>
          <ModalHeader>Document Reference</ModalHeader>
          <ModalBody>
            <h5>ID: {this.state.data.id}</h5>
            <Form>
              <div className="row">
                <div className="col-3">
                  <Label>Reference name: </Label>
                </div>
                <div className="col-6">
                  <Input id="reference" type="text" value={this.state.data.name} />
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
                  <Input id="reference" type="text" value={this.state.data.author} />
                </div>
              </div>

              <div className="row">
                <div className="col-3">
                  <Label>Link: </Label>
                </div>
                <div className="col-6">
                  <Input id="reference" type="text" value={this.state.data.link} />
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