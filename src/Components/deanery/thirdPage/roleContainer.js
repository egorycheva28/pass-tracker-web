import { connect } from "react-redux";
import React from "react";
import Role from "./role";
import { roleThunkCreator } from "../../../reducers/deaneryReducer";

class MiddleRoleComponent extends React.Component {

    render() {
        return (<Role{...this.props} />)
    }
}

function mapStatePropss(state) {
    return { deaneryPage: state.deaneryPage };
}

const RoleContainer = connect(mapStatePropss, { roleThunkCreator })(MiddleRoleComponent)

export default RoleContainer;