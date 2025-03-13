import axios from "axios";

const instance = axios.create({
    baseURL: 'https://localhost:7129/user/'
});

const instanceA = axios.create({
    baseURL: 'https://localhost:7129/user/',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});

function loginUser(email, password){
    return instance.post("/login", { email, password })
    .then(response => {
        if(response.status === 200){
            return response.data;
        }
    })
    .catch(error => {
        console.log(error.response.data.error)
    });
}

function registerUser(fullName, password, email, birthDate, gender, phoneNumber) {
    const body = {
        fullName: fullName,
        password: password,
        email: email,
        birthDate: birthDate,
        gender: gender,
        phoneNumber: phoneNumber
        /*lastName: lastName,
        firstName: firstName,
        middleName: middleName,
        group: group,
        email: email,
        password1: password1,
        password2: password2*/
    }

    return instance.post(`register`, body)
        .then(response => {
            console.log("Catalog Data:", response.data);

            if (response.status === 200) {
                console.log("Catalog Data:", response.data);
                return response.data;
            }
        })
        .catch(error => {
            console.log(error.response.data.error)
        });
}

async function logout() {
    return await instanceA.post(`logout`)
        .then(response => {
            console.log("Catalog Data:", response.data);

            if (response.status === 200) {
                console.log("Catalog Data:", response.data);
                return response.data;
            }
        })
        .catch(error => {
            console.log(error.response.data.error)
        });
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


function updateProfile(email) {
    return api.post("/edit/email", { email })
        .then(response => response.data)
        .catch(error => console.log(error.response.data?.error || "Ошибка обновления профиля"));
}
export const userApi = {
    loginUser: loginUser,
    getProfile: getProfile,
    registerUser: registerUser,
    logout: logout,
    updateProfile: updateProfile
    
}