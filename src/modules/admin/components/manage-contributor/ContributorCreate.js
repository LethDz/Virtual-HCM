import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import 'src/static/stylesheets/contributor.create.css';
import avatar from 'src/static/images/img_avatar.png';

export default class ContributorCreate extends Component {
  constructor() {
    super();
    this.state = {
      imageSrc: null,
    };

    this.imageRef = React.createRef();
  }

  onUploadImage = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      this.setState({ imageSrc: null });
      return;
    }

    const src = event.target.files[0];
    const objectURL = URL.createObjectURL(src);
    this.setState({ imageSrc: objectURL });
  };

  componentWillUnmount() {
    if (this.state.imageSrc) {
      URL.revokeObjectURL(this.state.imageSrc);
    }
  }

  render() {
    return (
      <Container className="cl-create-container">
        <Row>
          <Col className="justify-content-center d-flex">
            <h5 className="mt-2 mb-2">Create Account</h5>
          </Col>
        </Row>
        <Form className="mt-5">
          <Row>
            <Col>
              <FormGroup row>
                <Label for="username" sm={2}>
                  Username:
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter username"
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="password" sm={2}>
                  Password:
                </Label>
                <Col sm={10}>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter password"
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="fullname" sm={2}>
                  Full Name:
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="fullname"
                    id="fullname"
                    placeholder="Enter full name"
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="gender" sm={2}>
                  Gender:
                </Label>
                <Col sm={2} className="ml-2 align-self-center text-center">
                  <Input type="radio" name="gender" id="male" required />
                  &nbsp;Male
                </Col>
                <Col sm={2} className="ml-2 align-self-center text-center">
                  <Input type="radio" name="gender" id="female" />
                  &nbsp;Female
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="phoneNumber" sm={2}>
                  Phone number:
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="Enter phone number"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="address" sm={2}>
                  Address:
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Enter address"
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="dateOfBirth" sm={2}>
                  Date of birth:
                </Label>
                <Col sm={10}>
                  <Input type="date" name="dateOfBirth" id="dateOfBirth" required/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="placeOfBirth" sm={2}>
                  Place of birth:
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="placeOfBirth"
                    id="placeOfBirth"
                    placeholder="Enter place of birth"
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="nationality" sm={2}>
                  Nationality:
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="nationality"
                    id="nationality"
                    placeholder="Enter nationality"
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="idNumber" sm={2}>
                  ID number:
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="idNumber"
                    id="idNumber"
                    placeholder="Enter id number"
                    required
                  />
                </Col>
              </FormGroup>
            </Col>
            <Col>
              <Row className="justify-content-center mb-3">
                <img
                  type="image"
                  name="avatarImage"
                  id="avatarImage"
                  alt="avatar"
                  className="create-contributor-image"
                  src={this.state.imageSrc ? this.state.imageSrc : avatar}
                ></img>
              </Row>
              <Row className="justify-content-center">
                <div className="upload-btn-wrapper">
                  <Button color="primary" className="btn-upload-custom">
                    Upload avatar
                  </Button>
                  <Input
                    ref={this.imageRef}
                    className="h-100 upload-hidden"
                    type="file"
                    name="avatar"
                    id="avatar"
                    accept="image/*"
                    onChange={this.onUploadImage}
                  />
                </div>
              </Row>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <Row className="justify-content-end mr-1">
                <Button type="reset">
                  <FontAwesomeIcon icon={faTimes} />
                  &nbsp; Cancel
                </Button>
              </Row>
            </Col>
            <Col>
              <Row className="justify-content-start mr-1">
                <Button color="info" type="submit">
                  <FontAwesomeIcon icon={faPlus} />
                  &nbsp; Create
                </Button>
              </Row>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}
