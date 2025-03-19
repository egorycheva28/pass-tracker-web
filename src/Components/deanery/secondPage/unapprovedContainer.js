import { connect } from "react-redux";
import React from "react";
import Unapproved from "./unapproved";
import { unapprovedApplicationsThunkCreator } from "../../../reducers/deaneryReducer";

class MiddleUnapprovedComponent extends React.Component {

    render() {
        return (<Unapproved{...this.props} />)
    }
}

function mapStateProps(state) {
    return { deaneryPage: state.deaneryPage };
}

const UnapprovedApplicationsContainer = connect(mapStateProps, { unapprovedApplicationsThunkCreator })(MiddleUnapprovedComponent)

export default UnapprovedApplicationsContainer;