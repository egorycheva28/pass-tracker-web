import createAxiosInstance from "./axiosInstance";

const api = createAxiosInstance("user");

function loginUser(email, password) {
    return api.post("/login", { email, password })
        .then(response => {
            if (response.status === 200) {
                localStorage.setItem('token', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                return response.data;
            }
        })
        .catch(error => {
            console.log(error.response.data?.error || "Ошибка входа");
        });
}

function registerUser(lastName, firstName, middleName, group, email, password) {
    return api.post("/register", { lastName, firstName, middleName, group, email, password })
        .then(response => {
            if (response.status === 200) {
                localStorage.setItem('token', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                return response.data;
            }
        })
        .catch(error => console.log(error.response.data?.error || "Ошибка регистрации"));
}

function logout() {
    return api.post("/logout", {})
        .then(response => response.data)
        .catch(error => console.log(error.response.data?.error || "Ошибка выхода"));
}

function getProfile() {
    return api.get("/profile")
        .then(response => response.data)
        .catch(error => console.log(error.response.data?.error || "Ошибка получения профиля"));
}

function getProfileById(id) {
    return api.get(`/profile/${id}`)
        .then(response => response.data)
        .catch(error => console.log(error.response.data?.error || "Ошибка получения профиля"));
}

function updateProfile(fullName) {
    return api.post("/profile", { fullName })
        .then(response => response.data)
        .catch(error => console.log(error.response.data?.error || "Ошибка обновления профиля"));
}

export const userApi = {
    loginUser,
    getProfile,
    registerUser,
    logout,
    updateProfile,
    getProfileById
};
