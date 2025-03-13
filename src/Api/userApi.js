import axios from "axios";

const instance = axios.create({
    baseURL: 'https://localhost:7129/user/'
});

function loginUser(email, password) {
    return instance.post("/login", { email, password })
        .then(response => {
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(error => {
            console.log(error.response.data.error)
        });
}

function registerUser(lastName, firstName, middleName, group, email, password) {
    const body = {
        secondName: lastName,
        firstName: firstName,
        middleName: middleName,
        group: group == "" ? null : group,
        email: email,
        password: password
    }

    return instance.post(`/register`, body)
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
    const token = localStorage.getItem("token");
    console.log(token);
    return await instance.post(`logout`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
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
    const token = localStorage.getItem("token");
    console.log(token);
    return instance.get("/profile", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

        .then(response => {
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(error => {
            console.log(error.response.data.error)
        });

}

function getProfileById(id) {
    const token = localStorage.getItem("token");
    console.log(token);
    return instance.get(`/profile/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

        .then(response => {
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(error => {
            console.log(error.response.data.error)
        });

}


function updateProfile(fullName) {
    const token = localStorage.getItem("token");

    return instance.put("/profile", { fullName }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

        .then(response => {
            return response.data;

        })
        .catch(error => {
            console.log(error.response.data.error)
        });

}

export const userApi = {
    loginUser: loginUser,
    getProfile: getProfile,
    registerUser: registerUser,
    logout: logout,
    getProfileById: getProfileById
}