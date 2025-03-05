import { prepodApi } from "../Api/teacherApi";

const LIST_STUDENT = "LIST_STUDENT";

let initialState = {
    listStudents: []
}

const teacherReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch (action.type) {
        case LIST_STUDENT:
            newState.listStudents = action.listStudents;
            return newState;
        default:
            return newState;
    }
}

export function getStudentsActionCreator(data) { //обращение к reducers
    return { type: LIST_STUDENT, listStudents: data.posts }
}

export function getStudentsThunkCreator() { //обращение к серверу
    return async (dispatch) => {
        try {
            const data = await prepodApi.listStudents();
            dispatch(getStudentsActionCreator(data));
        }
        catch (error) {
            console.error("Ошибка:", error);
            alert("Произошла ошибка при регистрации.");
        }
    }
}

export default teacherReducer;