import { deaneryApi } from "../Api/deaneryApi";

const APPROVED_APPLICATIONS = "APPROVED_APPLICATIONS";
//const UNAPPROVED_APPLICATIONS = "UNAPPROVED_APPLICATIONS";
const EXPORT = "EXPORT";

let initialState = {
    approvedApplications: [],
    //unapprovedApplications: [],
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
        /*case UNAPPROVED_APPLICATIONS:
            newState.unapprovedApplications = action.unapprovedApplications;
            newState.pagination2 = action.pagination2;
            return newState;*/
        case EXPORT:
            return newState;
        default:
            return newState;
    }
}

export function approvedApplicationsActionCreator(data) { //обращение к reducers
    return { type: APPROVED_APPLICATIONS, approvedApplications: data.posts, pagination: data.pagination }
}

export function approvedApplicationsThunkCreator(params) { //обращение к серверу
    //console.log(params);
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

/*export function unapprovedApplicationsActionCreator(data) { //обращение к reducers
    return { type: UNAPPROVED_APPLICATIONS, unapprovedApplications: data.tags }
}

export function unapprovedApplicationsThunkCreator(params) { //обращение к серверу
    //console.log(params);
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
}*/

/*export function exportActionCreator(data) { //обращение к reducers
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
}*/

export default deaneryReducer;