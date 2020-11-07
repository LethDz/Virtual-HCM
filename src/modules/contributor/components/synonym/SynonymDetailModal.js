import React, { Component } from 'react';
import {
  Form,
  Input,
  Button,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  Container,
  FormGroup,
  ModalFooter,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SYNONYM, GET_SYNONYM } from 'src/constants';
import { handleInputChange } from 'src/common/handleInputChange';
import axiosClient from 'src/common/axiosClient';
import { connect } from 'react-redux';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';
import SuccessAlert from 'src/common/alertComponent/SuccessAlert';
import {
  getAllSynonyms,
  pullSynonymDetail,
  getSynonymDetail,
} from 'src/modules/contributor';

class SynonymDetailModal extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      synonym_id: '',
      meaning: '',
      words: '',
      loading: false,
      errorAlert: false,
      successAlert: false,
      errorList: [],
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
    this.initiateData();
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  initiateData = () => {
    if (
      this.props.synonymDetail &&
      this.props.synonymDetail.synonym_id === parseInt(this.props.id)
    ) {
      this.setState({
        ...this.props.synonymDetail,
      });
    } else {
      this.setLoading(true);
      axiosClient
        .get(SYNONYM + GET_SYNONYM(this.props.id))
        .then((response) => {
          if (response.data.status) {
            const synonym = response.data.result_data;
            this.props.pullSynonymDetail(synonym);
            this.setState({
              ...synonym,
            });
          } else {
            this.setErrorAlert(true);
          }
          this.setLoading(false);
        })
        .catch(() => {
          this.setLoading(false);
          this.setErrorAlert(true);
          this.setSuccessAlert(false);
        });
    }
  };

  handleInput = (event) => handleInputChange(event, this);

  setLoading = (status) => {
    this._isMounted &&
      this.setState({
        loading: status,
      });
  };

  onDismiss = (name) => {
    this._isMounted &&
      this.setState({
        [name]: false,
      });
  };

  setSuccessAlert = (status) => {
    this._isMounted &&
      this.setState({
        successAlert: status,
      });
  };

  setErrorAlert = (status) => {
    this._isMounted &&
      this.setState({
        errorAlert: status,
      });
  };

  setErrorList = (list) => {
    this._isMounted &&
      this.setState({
        errorList: list,
      });
  };
  render() {
    return (
      <Container>
        <Modal
          isOpen={this.props.isOpen}
          toggle={this.props.toggle}
          unmountOnClose={true}
        >
          <ModalHeader toggle={this.props.toggle}>
            Document Reference
          </ModalHeader>
          <Form>
            <ModalBody>
              <LoadingSpinner loading={this.state.loading} text={'Loading'} />
              <Container>
                {this.state.successAlert && (
                  <SuccessAlert
                    successAlert={this.state.successAlert}
                    text="Editing synonym is successfully"
                    onDismiss={() => this.onDismiss('successAlert')}
                  />
                )}
                {this.state.errorAlert && (
                  <ErrorAlert
                    errorAlert={this.state.errorAlert}
                    errorList={this.state.errorList}
                    onDismiss={() => this.onDismiss('errorAlert')}
                  />
                )}

                <Label>
                  <h5>ID: {this.state.synonym_id}</h5>
                </Label>

                <FormGroup>
                  <Label>Meaning: </Label>
                  <Input
                    name="meaning"
                    type="text"
                    required
                    value={this.state.meaning}
                    onChange={this.handleInput}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Words: </Label>
                  <Input
                    name="words"
                    type="textarea"
                    required
                    value={this.state.words}
                    onChange={this.handleInput}
                  />
                </FormGroup>
                
              </Container>
            </ModalBody>
            <ModalFooter>
              <Button
                color="warning"
                type="submit"
                disabled={this.state.loading}
              >
                <FontAwesomeIcon icon={faEdit} color="white" />
                &nbsp;Edit
              </Button>

              <Button color="danger" disabled={this.state.loading}>
                <FontAwesomeIcon icon={faTrash} color="white" />
                &nbsp;Delete
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  synonymDetail: getSynonymDetail(state),
  synonymList: getAllSynonyms(state),
});

const mapDispatchToProps = (dispatch) => ({
  pullSynonymDetail: (synonym) => dispatch(pullSynonymDetail(synonym)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SynonymDetailModal);
