import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { CONTRIBUTOR_PAGE_CREATE_DATA_APPROVAL_FORM } from "src/constants";

class DataApprovalList extends Component {
  render() {
    return (
      <div>
        DataApproval
        <Link to={CONTRIBUTOR_PAGE_CREATE_DATA_APPROVAL_FORM}>
          <Button>Create</Button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DataApprovalList);
