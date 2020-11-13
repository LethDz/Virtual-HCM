import React, { Component, Fragment } from 'react';
import {
  Row,
  Col,
  Label,
  Input,
  Button,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import {
  getAllDocumentReference,
  fetchAllDocumentReference,
  ReferenceModal,
  FormSectionTitle,
} from 'src/modules/contributor/index';
import { connect } from 'react-redux';

class MetaData extends Component {
  _isMounted = false;
  constructor(props) {
    super();
    this.state = {
      isOpenReferenceModal: false,
      referenceList: [],
    };
  }

  componentDidMount = () => {
    this._isMounted = true;

    if (this.props.referenceValue) {
      let referenceList = [];
      this.props.referenceValue.forEach((reference) => {
        referenceList.push({
          reference_name: reference.name,
          id: reference.id,
          page: reference.page,
          extra_info: reference.extra_info,
        });
      });
      this.setState({ referenceList: referenceList });
    }
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  toggleReferenceModal = () => {
    if (this._isMounted)
      this.setState({ isOpenReferenceModal: !this.state.isOpenReferenceModal });
  };

  addReference = (reference) => {
    let referenceList = this.state.referenceList;
    referenceList.push(reference);
    if (this._isMounted) this.setState({ referenceList: referenceList });
    this.setReference();
  };

  removeReference = (index) => {
    let referenceList = this.state.referenceList;
    if (index > -1) {
      referenceList.splice(index, 1);
    }
    if (this._isMounted) this.setState({ referenceList: referenceList });
    this.setReference();
  };

  setReference = () => {
    let referenceList = [];
    this.state.referenceList.forEach((reference) => {
      referenceList.push({
        id: reference.id,
        page: reference.page,
        extra_info: reference.extra_info,
      });
    });
    this.props.setReference(referenceList);
  };

  render() {
    return (
      <Fragment>
        {this.state.isOpenReferenceModal && (
          <ReferenceModal
            isOpen={this.state.isOpenReferenceModal}
            toggle={this.toggleReferenceModal}
            addReference={this.addReference}
            setErrorAlert={this.props.setErrorAlert}
            setSuccessAlert={this.props.setSuccessAlert}
            scrollToTop={this.props.scrollToTop}
          />
        )}
        <Row className="col">
          <Col xs="auto" className="mr-2">
            <Row>
              <Label className="label small-title" for="intent">
                Intent:
              </Label>
            </Row>
            <Row>
              <Label className="label small-title" for="intentFullName">
                Intent full name:
              </Label>
            </Row>
          </Col>
          <Col xs="6">
            <Row className="mb-1">
              <Input
                placeholder="Enter intent here"
                required
                type="text"
                name="intent"
                id="intent"
                value={this.props.intentValue}
                onChange={this.props.onChange}
              />
            </Row>
            <Row className="mb-1">
              <Input
                placeholder="Enter intent fullname here"
                required
                type="text"
                name="intentFullName"
                id="intentFullName"
                value={this.props.intentFullNameValue}
                onChange={this.props.onChange}
              />
            </Row>
          </Col>
        </Row>

        <hr className="mr-3 ml-3 divider" />
        <Row className="col">
          <FormSectionTitle title="Reference" />
          <Col xs="auto" className="m-1">
            <Button
              type="button"
              onClick={this.toggleReferenceModal}
              color="success"
            >
              <FontAwesomeIcon icon={faPlusCircle} /> New reference
            </Button>
          </Col>
        </Row>
        <Row className="col">
          <ListGroup>
            {this.state.referenceList &&
              this.state.referenceList.map((reference, index) => {
                return (
                  <ListGroupItem key={index}>
                    <Row>
                      <Col>
                        <Row>
                          {reference.reference_name}; Page: {reference.page}
                        </Row>
                      </Col>
                      <Col xs="auto">
                        <Button
                          color="danger"
                          onClick={() => {
                            this.removeReference(index);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                );
              })}
          </ListGroup>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  documentReferenceList: getAllDocumentReference(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllSynonyms: (documentReferenceList) =>
    dispatch(fetchAllDocumentReference(documentReferenceList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MetaData);
