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
            console.error("Ошибка запроса:", error.response?.data || error.message);
            throw error;
        });
}

function registerUser(secondName, firstName, middleName, group, email, password) {
    return api.post("/register", { secondName, firstName, middleName, group, email, password })
        .then(response => {
            if (response.status === 200) {
                localStorage.setItem('token', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                return response.data;
            }
        })
        .catch(error => {
            if (error.response?.status === 400 && error.response?.data?.detail === "This email is already used!") {
                console.error("Ошибка: Такая почта уже используется.");
                alert("Ошибка: Такая почта уже используется.");
            } else {
                console.error(error.response?.data?.detail || "Ошибка регистрации");
            }
        })
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

function logout() {
    return api.post("/logout", {})
        .then(response => response.data)
        .catch(error => console.log(error.response.data?.error || "Ошибка выхода"));
}

function updateProfile(email) {
    return api.patch("/edit/email", { email })

        .then(response => response.data)
        .catch(error => {
            console.log(error.response.data?.error || "Ошибка выхода")
            throw error;
           
        })
}

function getHighestRole(id) {
    return api.get(`/highest-role/${id}`)

        .then(response => response.data)
        .catch(error => console.log(error.response.data?.error || "Ошибка получения высшей роли"));
}

export const userApi = {
    loginUser: loginUser,
    getProfile: getProfile,
    registerUser: registerUser,
    logout: logout,
    updateProfile: updateProfile,
    getProfileById: getProfileById,
    getHighestRole: getHighestRole
}