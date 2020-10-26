import React, { Component } from 'react';
import { Button, Container } from 'reactstrap';
import { CreateReferenceModal, ReferenceList } from "src/modules/contributor/index"

class ViewReference extends Component {

    constructor() {
        super();
        this.state = {
            modal: false,
        }
    }

    onGridReady = (params) => {
        let currentState = this.state;
        currentState.gridApi = params.api;
        this.setState(currentState);
    };

    onClick = () => {
        let currentState = this.state;
        currentState.modal = !currentState.modal;
        this.setState(currentState);
    }

    render() {
        return (
            <Container>
                <h1>Document reference</h1>
                <ReferenceList />
                <Button 
                onClick={this.onClick.bind(this)}
                >Add new</Button>
                <CreateReferenceModal modal={this.state.modal}/>
            </Container>
        );
    }
}

export default ViewReference;