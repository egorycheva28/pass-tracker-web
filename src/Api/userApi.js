import axios from "axios";

const instance = axios.create({
    baseURL: 'https://blog.kreosoft.space/api/account/'
});

function registerUser(lastName, firstName, middleName, group, email, password1, password2) {
    const body = {
        /*fullName: fullName,
        password: password,
        email: email,
        birthDate: birthDate,
        gender: gender,
        phoneNumber: phoneNumber*/
        lastName: lastName,
        firstName: firstName,
        middleName: middleName,
        group: group,
        email: email,
        password1: password1,
        password2: password2
    }

    return instance.post(`register`, body)
        .then(response => {
            if (response.status === 200) {
                console.log("Catalog Data:", response.data);
                return response.data;
            }
        })
        .catch(error => {
            console.log(error.response.data.error)
        });
}

export const userApi = {
    registerUser: registerUser
}