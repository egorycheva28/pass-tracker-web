import { prepodApi } from "../Api/teacherApi";

const LIST_STUDENT = "LIST_STUDENT";
const EXPORT = "EXPORT";

let initialState = {
    listStudents: [],
    pagination: {
        size: '',
        count: '',
        current: ''
    }
}

const teacherReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch (action.type) {
        case LIST_STUDENT:
            newState.listStudents = action.listStudents;
            newState.pagination = action.pagination;
            return newState;
        case EXPORT:
            return newState;
        default:
            return newState;
    }
}

export function getStudentsActionCreator(data) { //обращение к reducers
    return { type: LIST_STUDENT, listStudents: data.requests, pagination: data.pagination }
}

export function getStudentsThunkCreator(params) { //обращение к серверу
    return async (dispatch) => {
        try {
            const data = await prepodApi.listStudents(params);
            dispatch(getStudentsActionCreator(data));
        }
        catch (error) {
            console.error("Ошибка:", error);
            alert("Произошла ошибка.");
        }
    }
}

export function exportActionCreator(data) { //обращение к reducers
    return { type: EXPORT }
}

export function exportThunkCreator() { //обращение к серверу
    return async (dispatch) => {
        try {
            const data = await prepodApi.exportListStudents();
            dispatch(exportActionCreator(data));
        }
        catch (error) {
            console.error("Ошибка:", error);
            alert("Произошла ошибка.");
        }
    }
}

export default teacherReducer;