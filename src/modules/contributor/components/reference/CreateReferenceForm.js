import React, { Component } from 'react';
import { Form, Input, Button } from 'reactstrap';

class CreateReferenceForm extends Component {
    render() {
        return (
            <Form className="row">
                <div className="col-3">
                    <Input type="text" placeholder="Reference name" />
                </div>
                <div className="col-3">
                    <Input type="text" placeholder="Author" />
                </div>

                <div className="col-3">
                    <Input type="text" placeholder="Link" />
                </div>
                <div className="col-2">
                    <Input type="select" name="select" id="referenceType">
                        <option value="book">Book</option>
                        <option value="link">Link</option>
                    </Input>
                </div>

                <div className="col-1"><Button>Submit</Button></div>
                
            </Form>
        );
    }
}

export default CreateReferenceForm;