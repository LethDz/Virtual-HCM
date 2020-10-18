import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CreateDataApprovalForm } from "src/modules/contributor/index";
import 'react-contexify/dist/ReactContexify.min.css';

class Contributor extends Component {
    render() {
        return (
            <div>
                <CreateDataApprovalForm></CreateDataApprovalForm>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({});
  
const mapDispatchToProps = (dispatch) => ({});
  
export default connect(mapStateToProps, mapDispatchToProps)(Contributor)