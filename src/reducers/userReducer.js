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
            const data2 = await userApi.getProfile();
            const data3 = await userApi.getHighestRole(data2.id);
            localStorage.setItem('token', `${data.accessToken}`);
            const fio = data2.name.split(" ");
            localStorage.setItem('lastName', `${fio[0]}`);
            localStorage.setItem('firstName', `${fio[1][0]}`);
            localStorage.setItem('middleName', `${fio[2][0]}`);
            localStorage.setItem('role', `${data3.role}`);
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