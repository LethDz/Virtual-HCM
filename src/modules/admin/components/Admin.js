import React, { Component } from 'react'
import { connect } from 'react-redux'
// import ContributorList from 'src/modules/admin/components/contributor/ContributorList'
import "src/static/stylesheets/admin.css"
import CreateContributorForm from './contributor/CreateContributorForm'

class Admin extends Component {
    render() {
        return (
            <div>
                {/* <ContributorList /> */}
                <CreateContributorForm />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({});
  
const mapDispatchToProps = (dispatch) => ({});
  
export default connect(mapStateToProps, mapDispatchToProps)(Admin)