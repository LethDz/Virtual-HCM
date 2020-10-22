import React, { Component } from 'react';
import { CreateReferenceForm, ReferenceList } from "src/modules/contributor/index"

class ViewReference extends Component {
    render() {
        return (
            <div>
                <h1>Document reference</h1>
                <CreateReferenceForm />
                <ReferenceList />
            </div>
        );
    }
}

export default ViewReference;