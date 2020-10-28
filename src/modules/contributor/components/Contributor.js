import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ViewReference } from "src/modules/contributor/index";
import 'react-contexify/dist/ReactContexify.min.css';

class Contributor extends Component {
    render() {
        return (
                <ViewReference />
        )
    }
}

const mapStateToProps = (state) => ({});
  
const mapDispatchToProps = (dispatch) => ({});
  
export default connect(mapStateToProps, mapDispatchToProps)(Contributor)