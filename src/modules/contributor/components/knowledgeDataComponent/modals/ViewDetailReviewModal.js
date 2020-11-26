import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalBody, Row, Col, Badge } from 'reactstrap';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import SuccessAlert from 'src/common/alertComponent/SuccessAlert';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';
import {
    ACCEPT,
    DECLINE,
    DRAFT,
} from 'src/modules/contributor/index';

export default class ViewDetailReviewModal extends Component {
    _isMounted = false;
    constructor() {
        super();
        this.state = {
            loading: false,
            successAlert: false,
            errorAlert: false,
            alertMessage: '',
            data: null
        }
    }

    setSuccessAlert = (status) => {
        this._isMounted &&
            this.setState({
                successAlert: status,
            });
    };

    setAlertMessage = (message) => {
        this._isMounted &&
            this.setState({
                alertMessage: message,
            });
    };

    setErrorAlert = (status) => {
        this._isMounted &&
            this.setState({
                errorAlert: status,
            });
    };

    onDismiss = (name) => {
        this._isMounted &&
            this.setState({
                [name]: false,
            });
    };

    componentDidMount = () => {
        this._isMounted = true;
        this.setState({ data: this.props.data })
        console.log(this.state.data)
    };

    componentWillUnmount = () => {
        this._isMounted = false;
    };

    setLoading = (status) => {
        this._isMounted && this.setState({ loading: status })
    }

    onGridReady = async (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    };

    toggleThisModal = () => {
        this.props.toggle()
    }

    sizeToFit = () => {
        this.gridApi.sizeColumnsToFit();
    };

    onFirstDataRendered = () => {
        this.sizeToFit();
    }

    returnStatusBadge = () => {
        const className = ""
        switch (this.state.data.status) {
            case ACCEPT:
                return <h3><Badge className={className} color="success" pill>Accept</Badge></h3>
            case DECLINE:
                return <h3><Badge className={className} color="danger" pill>Decline</Badge></h3>
            case DRAFT:
                return <h3><Badge className={className} color="warning" pill>Draft</Badge></h3>
            default:
                return <Fragment></Fragment>
        }
    }

    render() {
        if (this.state.data) {
            return (
                <Modal size="lg" isOpen={this.props.isOpen} toggle={this.toggleThisModal}>
                    <LoadingSpinner type="MODAL" text="Loading reviews" loading={this.state.loading} />
                    <ModalHeader toggle={this.toggleThisModal}>
                        Review detail
                    </ModalHeader>
                    <ModalBody className="min-height-400">
                        {this.state.successAlert && (
                            <SuccessAlert
                                successAlert={this.state.successAlert}
                                text={this.state.alertMessage}
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
                        <Row>
                            <Col>
                                <h3>{this.state.data.username}</h3>
                            </Col>
                            <Col xs="auto">
                                {this.returnStatusBadge()}
                            </Col>
                        </Row>
                        <div className="mt-2">{this.state.data.review}</div>
                    </ModalBody>
                </Modal>
            );
        }
        else return ''

    }
}

