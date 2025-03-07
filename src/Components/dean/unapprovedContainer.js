import { connect } from "react-redux";
import React from "react";
import Unapproved from "./unapproved";
import { unapprovedApplicationsThunkCreator } from "../../reducers/deanReducer";

class MiddleUnapprovedComponent extends React.Component {
    /*componentDidMount() {
        this.props.getStudentsThunkCreator();
    }*/
    render() {
        return (<Unapproved{...this.props} />)
    }
}

function mapStateProps(state) {
    return { deanPage: state.deanPage };
}

const UnapprovedApplicationsContainer = connect(mapStateProps, { unapprovedApplicationsThunkCreator })(MiddleUnapprovedComponent)

export default UnapprovedApplicationsContainer;