import { userApi } from "../Api/userApi";

const REGISTER_USER = "REGISTER_USER";
const LOGOUT = "LOGOUT";

let initialState = {

    accessToken: ''
}

const userReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch (action.type) {
        case REGISTER_USER:
            newState.accessToken = action.accessToken;
            return newState;
        case LOGOUT:
            //newState.token = action.token;
            return newState;
        default:
            return newState;
    }
}

export function registerUserActionCreator(data) { //обращение к reducers
    return { type: REGISTER_USER, token: data.accessToken }
}

export function registerUserThunkCreator(lastName, firstName, middleName, group, email, password) { //обращение к серверу
    return async (dispatch) => {
        if (!lastName || !firstName || !middleName || !email || !password) {
            alert("Пожалуйста, заполните все поля.");
            return;
        }
        try {
            const data = await userApi.registerUser(lastName, firstName, middleName, group, email, password);
            dispatch(registerUserActionCreator(data));
            localStorage.setItem('token', `${data.accessToken}`);
            localStorage.setItem('lastName', `${lastName}`);
            localStorage.setItem('firstName', `${lastName[0]}`);
            localStorage.setItem('middleName', `${lastName[0]}`);
            const datas = await userApi.getProfile();
            localStorage.setItem('role', `${datas.roles}`);
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