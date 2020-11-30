import React, { Component, Fragment } from 'react';
import { Badge } from 'reactstrap';

import {
    ACCEPT,
    DECLINE,
    DRAFT,
} from 'src/modules/contributor/index';

class StatusBadge extends Component {
    _isMounted = false;
    constructor(props) {
        super();
        this.state = {
            status: null
        }
    }

    componentDidMount = () => {
        this._isMounted = true
        const status = this.props.data.status
        this.setState({
            status: status
        })
    }

    componentWillUnmount = () => {
        this._isMounted = false
    }

    render() {
        const className = "mt-2"
        switch (this.state.status) {
            case ACCEPT:
                return <h6><Badge className={className} color="success" pill>Accept</Badge></h6>
            case DECLINE:
                return <h6><Badge className={className} color="danger" pill>Decline</Badge></h6>
            case DRAFT:
                return <h6><Badge className={className} color="warning" pill>Draft</Badge></h6>
            default:
                return <Fragment></Fragment>
        }
    }
}

export default StatusBadge;
