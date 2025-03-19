import { connect } from "react-redux";
import React from "react";
import ApprovedApplications from "./approvedApplications";
import { approvedApplicationsThunkCreator } from "../../../reducers/deaneryReducer";

class MiddleApprovedComponent extends React.Component {

    render() {
        return (<ApprovedApplications{...this.props} />)
    }
}

function mapStatePropss(state) {
    return { deaneryPage: state.deaneryPage };
}

const ApprovedApplicationsContainer = connect(mapStatePropss, { approvedApplicationsThunkCreator })(MiddleApprovedComponent)

export default ApprovedApplicationsContainer;