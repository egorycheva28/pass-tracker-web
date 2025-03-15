import { deaneryApi } from "../Api/deaneryApi";

const APPROVED_APPLICATIONS = "APPROVED_APPLICATIONS";
const UNAPPROVED_APPLICATIONS = "UNAPPROVED_APPLICATIONS";
const ROLE = "ROLE";
const ACCEPT_REQUEST = "ACCEPT_REQUEST";
const DECLINE_REQUEST = "DECLINE";
const EXPORT = "EXPORT";
const ADD_ROLE = "ADD_ROLE";
const DELETE_ROLE = "DELETE_ROLE";

let initialState = {
    approvedApplications: [],
    unapprovedApplications: [],
    role: [],
    pagination: {
        size: '',
        count: '',
        current: ''
    }
}

const deaneryReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch (action.type) {
        case APPROVED_APPLICATIONS:
            newState.approvedApplications = action.approvedApplications;
            newState.pagination = action.pagination;
            return newState;
        case UNAPPROVED_APPLICATIONS:
            newState.unapprovedApplications = action.unapprovedApplications;
            newState.pagination = action.pagination;
            return newState;
        case ROLE:
            newState.role = action.role;
            newState.pagination = action.pagination;
            return newState;
        case ACCEPT_REQUEST:
            return newState;
        case DECLINE_REQUEST:
            return newState;
        case EXPORT:
            return newState;
        case ADD_ROLE:
            return newState;
        case DELETE_ROLE:
            return newState;
        default:
            return newState;
    }
}

export function approvedApplicationsActionCreator(data) { //обращение к reducers
    return { type: APPROVED_APPLICATIONS, approvedApplications: data.requests, pagination: data.pagination }
}

export function approvedApplicationsThunkCreator(params) { //обращение к серверу
    return async (dispatch) => {
        try {
            const data = await deaneryApi.approvedApplications(params);
            dispatch(approvedApplicationsActionCreator(data));
        }
        catch (error) {
            console.error("Ошибка:", error);
            alert("Произошла ошибка.");
        }
    }
}

export function unapprovedApplicationsActionCreator(data) { //обращение к reducers
    return { type: UNAPPROVED_APPLICATIONS, unapprovedApplications: data.requests, pagination: data.pagination }
}

export function unapprovedApplicationsThunkCreator(params) { //обращение к серверу
    return async (dispatch) => {
        try {
            const data = await deaneryApi.unapprovedApplications(params);
            console.log(data);
            dispatch(unapprovedApplicationsActionCreator(data));
        }
        catch (error) {
            console.error("Ошибка:", error);
            alert("Произошла ошибка.");
        }
    }
}

export function roleActionCreator(data) { //обращение к reducers
    return { type: ROLE, role: data.requests, pagination: data.pagination }
}

export function roleThunkCreator(params) { //обращение к серверу
    return async (dispatch) => {
        try {
            const data = await deaneryApi.role(params);
            console.log(data);
            dispatch(roleActionCreator(data));
        }
        catch (error) {
            console.error("Ошибка:", error);
            alert("Произошла ошибка.");
        }
    }
}
export function acceptRequestActionCreator() { //обращение к reducers
    return { type: ACCEPT_REQUEST }
}

export function acceptRequestThunkCreator(id) { //обращение к серверу
    return async (dispatch) => {
        try {
            await deaneryApi.acceptRequest(id);
            //console.log(data);
            dispatch(acceptRequestActionCreator());
        }
        catch (error) {
            console.error("Ошибка:", error);
            alert("Произошла ошибка.");
        }
    }
}

export function declineRequestActionCreator(data) { //обращение к reducers
    return { type: DECLINE_REQUEST }
}

export function declineRequestThunkCreator(id, comment) { //обращение к серверу
    return async (dispatch) => {
        try {
            const data = await deaneryApi.declineRequest(id, comment);
            console.log(data);
            dispatch(declineRequestActionCreator(data));
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
            const data = await deaneryApi.exportListStudents();
            dispatch(exportActionCreator(data));
            console.log(data.body);
        }
        catch (error) {
            console.error("Ошибка:", error);
            alert("Произошла ошибка.");
        }
    }
}

export function addRoleActionCreator(data) { //обращение к reducers
    return { type: ADD_ROLE }
}

export function addRoleThunkCreator(id, role) { //обращение к серверу
    return async (dispatch) => {
        try {
            const data = await deaneryApi.addRole(id, role);
            dispatch(addRoleActionCreator(data));
           // console.log(data.body);
        }
        catch (error) {
            console.error("Ошибка:", error);
            alert("Произошла ошибка.");
        }
    }
}

export function deleteRoleActionCreator(data) { //обращение к reducers
    return { type: DELETE_ROLE }
}

export function deleteRoleThunkCreator(id, role) { //обращение к серверу
    return async (dispatch) => {
        try {
            const data = await deaneryApi.deleteRole(id, role);
            dispatch(deleteRoleActionCreator(data));
            //console.log(data.body);
        }
        catch (error) {
            console.error("Ошибка:", error);
            alert("Произошла ошибка.");
        }
    }
}

export default deaneryReducer;