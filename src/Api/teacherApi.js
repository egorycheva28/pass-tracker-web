import axios from "axios";
import createAxiosInstance from "./axiosInstance";

const api = createAxiosInstance("");

function listStudents(params) {
    //console.log(params.author);
    return api.get(`request/get-all-requests?StatusRequestSort=Accepted&StartDate=${params.startDate}&FinishDate=${params.finishDate}
         &Group=${params.group}&Name=${params.fullName}&page=${params.page}&size=${params.size}`)
    //return instance.get(`post?author=${params.author}&page=${params.page}&size=${params.size}`)

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
    return api.get(`/deanery/download-requests?StatusRequestSort=Accepted`, {
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