import axios from "axios";

const instance = axios.create({
    baseURL: 'https://localhost:7129/'
});

function listStudents(params) {
    const token = localStorage.getItem("token");
    return instance.get(`request/get-all-requests?StatusRequestSort=Accepted&StartDate=${params.startDate}&FinishDate=${params.finishDate}
        &Group=${params.group}&Name=${params.fullName}&page=${params.page}&size=${params.size}`, {
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