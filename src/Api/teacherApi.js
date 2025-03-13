import axios from "axios";

const instance = axios.create({
    baseURL: 'https://localhost:7129/'
});
//const api = createAxiosInstance("user");

function listStudents(params) {
    //console.log(params.author);
    //return api.get(`post?author=${params.author}&page=${params.page}&size=${params.size}`)
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

function exportListStudents() {
    const token = localStorage.getItem("token");
    return instance.get(`/deanery/download-requests`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        responseType: 'blob'
    })
        .then(response => {
            console.log("Catalog Data:", response.data);

            if (response.status === 200) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const a = document.createElement('a');
                a.href = url;
                a.setAttribute('download', 'requests.xlsx');
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
                console.log("Catalog Data:", response.data);
                return response.data;
            }
        })
        .catch(error => {
            console.log(error.response.data.error)
        });
}

export const prepodApi = {
    listStudents: listStudents,
    exportListStudents: exportListStudents
}