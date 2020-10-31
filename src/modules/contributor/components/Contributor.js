import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ReferenceList} from "src/modules/contributor/index";

class Contributor extends Component {
    render() {
        return (
                <ReferenceList />
        )
    }
}

const mapStateToProps = (state) => ({});
  
const mapDispatchToProps = (dispatch) => ({});
  
export default connect(mapStateToProps, mapDispatchToProps)(Contributor)