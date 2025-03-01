import { connect } from "react-redux";
import React from "react";
import RegisterUser from "./registerUser";

import { registerUserThunkCreator } from "../../reducers/userReducer";

class MiddleUserComponent extends React.Component {

    /*componentDidMount() {
        this.props.registerUserThunkCreator();
    }*/
    render() {
        return (<RegisterUser{...this.props} />)
    }
}

function mapStateProps(state) {
    return { registerPage: state.registerPage };
}

const UserContainer = connect(mapStateProps, { registerUserThunkCreator })(MiddleUserComponent)

export default UserContainer;