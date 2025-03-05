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

function listStudents(params) {
    //console.log(params.author);
    return instance.get(`post?author=${params.author}&page=${params.page}&size=${params.size}`)
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

/*function exportListStudents() {
    return instance.post(`post`)
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
}*/

export const prepodApi = {
    listStudents: listStudents,
    // exportListStudents: exportListStudents
}