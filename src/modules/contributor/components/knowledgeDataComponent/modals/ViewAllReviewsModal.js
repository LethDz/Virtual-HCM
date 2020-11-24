import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
import {
    getAllSynonyms,
    fetchAllSynonyms,
    columnSynonymListRef,
} from 'src/modules/contributor';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class SynonymsModal extends Component {
    _isMounted = false;
    constructor() {
        super();
    }

    componentDidMount = () => {
        this._isMounted = true;
    };

    componentWillUnmount = () => {
        this._isMounted = false;
    };

    onGridReady = async (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    };

    render() {
        return (
            <Modal size="lg">
                <ModalHeader>Synonyms</ModalHeader>
                <ModalBody>
                    <div
                        className="ag-theme-alpine"
                        style={{ height: 700, width: "100%" }}
                    >
                        <AgGridReact
                            onGridReady={this.onGridReady}
                            columnDefs={columnSynonymListRef}
                            pagination={true}
                            paginationAutoPageSize={true}
                        ></AgGridReact>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="warning">
                        <FontAwesomeIcon icon={faPlus} /> New synonym
                    </Button>
                    <Button color="success">
                        <FontAwesomeIcon icon={faPlus} /> Add
                  </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    synonymsList: getAllSynonyms(state),
});

const mapDispatchToProps = (dispatch) => ({
    fetchAllSynonyms: (synonymsList) => dispatch(fetchAllSynonyms(synonymsList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SynonymsModal);