import React, { Component } from 'react';
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
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import {
  getAllDocumentReference,
  fetchAllDocumentReference,
  ReferenceModal,
} from 'src/modules/contributor/index';
import { connect } from 'react-redux';

class MetaData extends Component {
  constructor(props) {
    super();
    this.state = {
      isOpenReferenceModal: false,
      referenceList: [],
    };
  }

  toggleReferenceModal = () => {
    this.setState({ isOpenReferenceModal: !this.state.isOpenReferenceModal });
  };

  newRefer = (e) => {
    console.log('test');
  };

  addReference = (reference) => {
    let referenceList = this.state.referenceList;
    referenceList.push(reference);
    this.setState({ referenceList: referenceList });
    this.setReference();
  };

  removeReference = (index) => {
    let referenceList = this.state.referenceList;
    if (index > -1) {
      referenceList.splice(index, 1);
    }
    this.setState({ referenceList: referenceList });
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
      <Row className="pb-3">
        <Col className="pr-0" xs="auto">
          <Col>
            <Label className="label" for="intent">
              Intent:
            </Label>
          </Col>
          <Col>
            <Label className="label" for="intentFullName">
              Intent full name:
            </Label>
          </Col>
        </Col>
        <Col xs="auto" className="m-1 pl-0 ml-0">
          <Input
            required
            className="m-1"
            type="text"
            name="intent"
            id="intent"
            onChange={this.props.onChange}
          />
          <Input
            required
            className="m-1"
            type="text"
            name="intentFullName"
            id="intentFullName"
            onChange={this.props.onChange}
          />
        </Col>
        <Col className="pr-5">
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

          <Row>
            <Col>
              <Label className="label" for="reference">
                Document reference:
              </Label>
            </Col>
            <Col xs="auto" className="m-1">
              <Button
                type="button"
                onClick={this.toggleReferenceModal}
                color="success"
              >
                <FontAwesomeIcon icon={faPlus} /> New reference
              </Button>
            </Col>
          </Row>
          <ListGroup>
            {this.state.referenceList.map((reference, index) => {
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
        </Col>
      </Row>
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
