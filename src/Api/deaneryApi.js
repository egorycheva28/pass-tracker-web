import axios from "axios";
import createAxiosInstance from "./axiosInstance";


const api = createAxiosInstance("");

function approvedApplications(params) {
    return api.get(`request/get-all-requests?StatusRequestSort=Accepted&StartDate=${params.startDate}&FinishDate=${params.finishDate}
        &Group=${params.group}&Name=${params.fullName}&page=${params.page}&size=${params.size}`)

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

function unapprovedApplications(params) {
    return api.get(`request/get-all-requests?StatusRequestSort=Pending&StartDate=${params.startDate}&FinishDate=${params.finishDate}
        &Group=${params.group}&Name=${params.fullName}&page=${params.page}&size=${params.size}`)

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

function role(params) {
    return api.get(`admin/users?page=${params.page}&size=${params.size}`)

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

function acceptRequest(id) {
    return api.post(`deanery/accept-request/${id}`, {})

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

function declineRequest(id, comment) {
    return api.post(`deanery/decline-request/${id}`, { comment: comment })

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
    return api.get(`/deanery/download-requests?StatusRequestSort=Accepted`,{

        responseType: 'blob'
        }
    )

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

export const deaneryApi = {
    approvedApplications: approvedApplications,
    unapprovedApplications: unapprovedApplications,
    role: role,
    acceptRequest: acceptRequest,
    declineRequest: declineRequest,
    exportListStudents: exportListStudents
}