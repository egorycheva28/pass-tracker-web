import { connect } from "react-redux";
import React from "react";
import RegisterUser from "./registerUser";

import { registerUserThunkCreator } from "../../reducers/userReducer";

class MiddleUserComponent extends React.Component {

    render() {
        return (<RegisterUser{...this.props} />)
    }
}

function mapStateProps(state) {
    return { registerPage: state.registerPage };
}

const RegisterUserContainer = connect(mapStateProps, { registerUserThunkCreator })(MiddleUserComponent)

export default RegisterUserContainer;