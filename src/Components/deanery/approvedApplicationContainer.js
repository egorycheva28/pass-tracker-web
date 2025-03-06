import { connect } from "react-redux";
import React from "react";
import ApprovedApplications from "./approvedApplications";
import { approvedApplicationsThunkCreator } from "../../reducers/deaneryReducer";

class MiddlePizzasComponent extends React.Component {
    /*componentDidMount() {
        this.props.getStudentsThunkCreator();
    }*/
    render() {
        return (<ApprovedApplications{...this.props} />)
    }
}

function mapStateProps(state) {
    return { deaneryPage: state.deaneryPage };
}

const ApprovedApplicationsContainer = connect(mapStateProps, { approvedApplicationsThunkCreator })(MiddlePizzasComponent)

export default ApprovedApplicationsContainer;