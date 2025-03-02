import { userApi } from "../Api/userApi";

const REGISTER_USER = "REGISTER_USER";
const LOGOUT = "LOGOUT";

let initialState = {

    token: ''
}

const userReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch (action.type) {
        case REGISTER_USER:
            newState.token = action.token;
            return newState;
        case LOGOUT:
            //newState.token = action.token;
            return newState;
        default:
            return newState;
    }
}

export function registerUserActionCreator(data) { //обращение к reducers
    return { type: REGISTER_USER, token: data }
}

export function registerUserThunkCreator(lastName, password1, email, firstName, middleName, group) { //обращение к серверу
    return async (dispatch) => {
        if (!lastName || !middleName || !email || !password1 || !group) {
            alert("Пожалуйста, заполните все поля.");
            return;
        }
        try {
            const data = await userApi.registerUser(lastName, password1, email, firstName, middleName, group);
            dispatch(registerUserActionCreator(data));
            localStorage.setItem('token', `${data.token}`);
            localStorage.setItem('lastName', `${lastName}`);
            localStorage.setItem('firstName', `${lastName[0]}`);
            localStorage.setItem('middleName', `${lastName[0]}`);
            alert("Успешный вход!");
        }
        catch (error) {
            console.error("Ошибка:", error);
            alert("Произошла ошибка при регистрации.");
        }
    }
}

export function logoutActionCreator() { //обращение к reducers
    return { type: REGISTER_USER }
}

export function logoutThunkCreator() { //обращение к серверу
    return async (dispatch) => {
        try {
            const data = await userApi.logout();
            dispatch(logoutActionCreator());

            alert("Успешный выход!");
        }
        catch (error) {
            console.error("Ошибка:", error);
            alert("Произошла ошибка при выходе.");
        }
    }
}

export default userReducer;