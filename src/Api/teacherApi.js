import axios from "axios";

const instance = axios.create({
    baseURL: 'https://blog.kreosoft.space/api/'
});

const instanceAuth = axios.create({
    baseURL: 'https://blog.kreosoft.space/api/account/',
    headers: {
        'Authorization': localStorage.getItem('token'),
    }
});

function listStudents() {
    return instance.get(`post`)
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

export const prepodApi = {
    listStudents: listStudents
}