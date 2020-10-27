import React, { Component } from 'react';
import { Form, Input, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

class CreateReferenceModal extends Component {
    render() {
        return (
            <Modal isOpen={this.props.modal}>
                <ModalHeader>Add New Document Reference</ModalHeader>
                <ModalBody>
                    <Form className="row">
                        <Input type="text" placeholder="Reference name"/>
                        <Input type="text" placeholder="Author" />
                         <Input type="text" placeholder="Link" />
                        <Input type="select" name="select" id="referenceType">
                            <option value="book">Book</option>
                            <option value="link">Link</option>
                        </Input>
                        <Button style={{backgroundColor:"#3c8dbc"}}>Add</Button>
                    </Form>
                </ModalBody>

            </Modal>
        );
    }
}

export default CreateReferenceModal;