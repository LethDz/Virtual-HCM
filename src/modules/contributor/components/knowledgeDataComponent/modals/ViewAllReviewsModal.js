import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
import {
    context,
    frameworkComponents,
    columnReviewListRef,
    ViewDetailReviewModal
} from 'src/modules/contributor';
import {
    KNOWLEDGE_DATA, ALL_REVIEW
} from 'src/constants';

import axiosClient from 'src/common/axiosClient';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

export default class ViewAllReviewsModal extends Component {
    _isMounted = false;
    constructor() {
        super();
        this.state = {
            reviews: [],
            loading: false,
            errorAlert: false,
            alertMessage: '',
            isOpenDetailReview: false,
            data: null
        }
    }

    toggleDetailReview = () => {
        this._isMounted && this.setState({ isOpenDetailReview: !this.state.isOpenDetailReview })
    }

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
    };

    componentWillUnmount = () => {
        this._isMounted = false;
    };

    setData = () => {
        this.setLoading(true)
        axiosClient
            .get(KNOWLEDGE_DATA + ALL_REVIEW(this.props.knowledgeDataId))
            .then(response => {
                this.setLoading(false)
                if (response.data.status) {
                    this._isMounted && this.setState({ reviews: response.data.result_data })
                    this.setErrorAlert(false);
                }
                else {
                    this.setErrorAlert(true);
                }
            })
            .catch(err => {
                this.setLoading(false)
                this.setErrorAlert(true);
            })
    }

    setLoading = (status) => {
        this._isMounted && this.setState({ loading: status })
    }

    onGridReady = async (params) => {
        await this.setData()
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

    onRowSelected = () => {
        let selectedRows = this.gridApi.getSelectedRows();
        this.setState({ data: selectedRows[0] })
    };

    onRowDoubleClicked = (row) => {
        this.setState({ data: row.data })
        this.toggleDetailReview()
    }

    render() {
        return (
            <Modal size="lg" isOpen={this.props.isOpen} toggle={this.toggleThisModal}>
                {this.state.isOpenDetailReview && this.state.data !== null &&
                    <ViewDetailReviewModal
                        isOpen={this.state.isOpenDetailReview}
                        toggle={this.toggleDetailReview}
                        data={this.state.data}
                    />
                }
                <LoadingSpinner type="MODAL" text="Loading reviews" loading={this.state.loading} />
                <ModalHeader toggle={this.toggleThisModal}>Reviews</ModalHeader>
                <ModalBody>
                    {this.state.errorAlert && (
                        <ErrorAlert
                            errorAlert={this.state.errorAlert}
                            errorList={this.state.errorList}
                            onDismiss={() => this.onDismiss('errorAlert')}
                        />
                    )}
                    <div className="d-flex justify-content-end mb-2">
                        <Button type="button" color="primary" disabled={this.state.data === null}
                            onClick={this.state.data && this.toggleDetailReview}>
                            <FontAwesomeIcon icon={faEye} /> View detail
                        </Button>
                    </div>
                    <div
                        className="ag-theme-alpine"
                        style={{ height: 700, width: "100%" }}
                    >
                        <AgGridReact
                            rowSelection="single"
                            onFirstDataRendered={this.onFirstDataRendered}
                            rowData={this.state.reviews}
                            onGridReady={this.onGridReady}
                            columnDefs={columnReviewListRef}
                            frameworkComponents={frameworkComponents}
                            context={context(this)}
                            onSelectionChanged={this.onRowSelected.bind(this)}
                            onRowDoubleClicked={this.onRowDoubleClicked.bind(this)}
                            pagination={true}
                            paginationAutoPageSize={true}
                        ></AgGridReact>
                    </div>
                </ModalBody>
                <ModalFooter>

                </ModalFooter>
            </Modal>
        );
    }
}

