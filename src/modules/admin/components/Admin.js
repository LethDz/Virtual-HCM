import React, { Component } from 'react'
import { connect } from 'react-redux'
// import ContributorList from 'src/modules/admin/components/ContributorList'

class Admin extends Component {
    render() {
        return (
            <div>
                list
            </div>
        )
    }
}

const mapStateToProps = (state) => ({});
  
const mapDispatchToProps = (dispatch) => ({});
  
export default connect(mapStateToProps, mapDispatchToProps)(Admin)