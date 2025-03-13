import { connect } from "react-redux";
import React from "react";
import ListStudents from './listStudents';
import { getStudentsThunkCreator } from "../../reducers/teacherReducer";

class MiddleListStudentsComponent extends React.Component {
    /*componentDidMount() {
        this.props.getStudentsThunkCreator();
    }*/
    render() {
        return (<ListStudents{...this.props} />)
    }
}

function mapStateProps(state) {
    return { teacherPage: state.teacherPage };
}

const ListStudentsContainer = connect(mapStateProps, { getStudentsThunkCreator })(MiddleListStudentsComponent)

export default ListStudentsContainer;