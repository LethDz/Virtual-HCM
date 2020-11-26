import React, { Component, Fragment } from 'react';
import { Badge } from 'reactstrap';

import {
    PROCESSING,
    AVAILABLE,
    DONE,
    DISABLE
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
        const className = "mt-2 badge-width"
        switch (this.state.status) {
            case PROCESSING:
                return <Badge className={className} color="warning">Processing</Badge>
            case AVAILABLE:
                return <Badge className={className} color="primary">Availble</Badge>
            case DONE:
                return <Badge className={className} color="success">Done</Badge>
            case DISABLE:
                return <Badge className={className} color="secondary">Disable</Badge>
            default:
                return <Fragment></Fragment>
        }
    }
}

export default StatusBadge;
