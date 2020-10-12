import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Col, FormText } from 'reactstrap';

const CreateContributorForm = () => {
    const [avatar, setAvatar] = useState(null)
    return (
        <Form>
            <div className="d-flex justify-content-center">
                <h1>Contributors</h1>
            </div>
            <div className="d-flex justify-content-around mt-3">
                <div className="col-4">
                    <FormGroup row>
                        <Label for="fullName" sm={4}>Full name:</Label>
                        <Col sm={6}>
                            <Input type="text" name="fullName" id="fullName" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="gender" sm={4}>Gender</Label>
                        <Col sm={6}>
                            <Input type="select" name="gender" id="gender">
                                <option>Male</option>
                                <option>Female</option>
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="phoneNumber" sm={4}>Phone number:</Label>
                        <Col sm={6}>
                            <Input type="text" name="phoneNumber" id="phoneNumber" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="address" sm={4}>Address:</Label>
                        <Col sm={6}>
                            <Input type="text" name="address" id="address" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="dateOfBirth" sm={4}>Date of birth:</Label>
                        <Col sm={6}>
                            <Input type="date" name="dateOfBirth" id="dateOfBirth" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="placeOfBirth" sm={4}>Place of birth:</Label>
                        <Col sm={6}>
                            <Input type="text" name="placeOfBirth" id="placeOfBirth" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="nationality" sm={4}>Nationality:</Label>
                        <Col sm={6}>
                            <Input type="text" name="nationality" id="nationality" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="idNumber" sm={4}>Identity number:</Label>
                        <Col sm={6}>
                            <Input type="text" name="idNumber" id="idNumber" />
                        </Col>
                    </FormGroup>
                </div>
                <div className="col-4">
                    <div>
                        <img className="create-form-avatar" id="avatar" src={avatar} alt=""/>
                    </div>
                    <div>
                        <FormGroup row>
                            <Label for="Avatar" sm={2}>Avatar</Label>
                            <Col sm={10}>
                                <Input type="file" name="file" id="Avatar" onChange={(data) => {
                                    setAvatar(URL.createObjectURL(data.target.files[0]))
                                }} />
                                <FormText color="muted">Insert ava plz</FormText>
                            </Col>
                        </FormGroup></div>
                </div>
            </div>
            <br />
            <div className="d-flex justify-content-around">
                <Button>Cancel</Button>
                <Button type="submit">Create</Button>
            </div>
        </Form>
    );
};

export default CreateContributorForm;
