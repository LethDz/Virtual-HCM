import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ReferenceListNew} from "src/modules/contributor/index";
import 'react-contexify/dist/ReactContexify.min.css';

class Contributor extends Component {
    render() {
        return (
                <ReferenceListNew />
        )
    }
}

const mapStateToProps = (state) => ({});
  
const mapDispatchToProps = (dispatch) => ({});
  
export default connect(mapStateToProps, mapDispatchToProps)(Contributor)