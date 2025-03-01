import { userApi } from "../Api/userApi";

const REGISTER_USER = "REGISTER_USER";

let initialState = {
    registerForm: {
        fullName: '',
        password: '',
        email: '',
        birthDate: '',
        gender: '',
        phoneNumber: ''
    },
    token: ''
}

const userReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch (action.type) {
        case REGISTER_USER:
            newState.registerForm = action.registerForm;
            return newState;
        default:
            return newState;
    }
}

export function registerUserActionCreator(data) { //обращение к reducers
    return { type: REGISTER_USER, token: data }
}

export function registerUserThunkCreator(lastName, firstName, middleName, group, email, password1, password2) { //обращение к серверу
    return async (dispatch) => {
        if (!lastName || !firstName || !middleName || !email || !password1 || !password2) {
            alert("Пожалуйста, заполните все поля.");
            return;
        }
        try {
            const data = await userApi.registerUser(lastName, firstName, middleName, group, email, password1, password2);
            dispatch(registerUserActionCreator(data));
            localStorage.setItem('token', `${data.token}`);
            localStorage.setItem('lastName', `${lastName}`);
            localStorage.setItem('firstName', `${firstName[0]}`);
            localStorage.setItem('middleName', `${middleName[0]}`);
            alert("Успешный вход!");
        }
        catch (error) {
            console.error("Ошибка:", error);
            alert("Произошла ошибка при регистрации.");
        }
    }
}

export default userReducer;