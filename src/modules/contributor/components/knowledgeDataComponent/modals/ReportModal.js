import React, { Component } from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

class ReportModal extends Component {
    _isMounted = false;

    componentDidMount = () => {
        this._isMounted = true;
    };

    componentWillUnmount = () => {
        this._isMounted = false;
    };

    toggleThisModal = () => {
        this.props.toggle();
    }

    render() {
        return (
            <Popover
                placement="bottom"
                isOpen={this.props.isOpen}
                target={this.props.buttonId}
                toggle={this.props.toggle}
                className="popover-width"
                hideArrow={true}
                flip={false}
            >
                <PopoverHeader>Review knowledge data</PopoverHeader>
                <PopoverBody>
                    {this.props.message}
                </PopoverBody>
            </Popover>
        );
    }
}

export default ReportModal