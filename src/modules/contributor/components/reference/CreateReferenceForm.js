import React, { Component } from 'react';
import { Button } from 'reactstrap';

class CreateReferenceForm extends Component {
    render() {
        return (
            <form>
                <input type="text" placeholder="Reference name" />
                <input type="text" placeholder="Author" />
                <input type="text" placeholder="Link" />
                <select>
                    <option value="book">Book</option>
                    <option value="link">Link</option>
                </select>
                <input type="submit" value="Create new reference"/>
            </form>
        );
    }
}

export default CreateReferenceForm;