import axios from "axios";

const instance = axios.create({
    baseURL: 'https://localhost:7129/'
});

function approvedApplications(params) {
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

function unapprovedApplications(params) {
    const token = localStorage.getItem("token");
    return instance.get(`request/get-all-requests?StatusRequestSort=Pending&StartDate=${params.startDate}&FinishDate=${params.finishDate}
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

function role(params) {
    const token = localStorage.getItem("token");
    return instance.get(`admin/users?page=${params.page}&size=${params.size}`, {
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

function acceptRequest(id) {
    const token = localStorage.getItem("token");
    return instance.post(`deanery/accept-request/${id}`, {}, {
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

function declineRequest(id, comment) {
    const token = localStorage.getItem("token");
    return instance.post(`deanery/decline-request/${id}`, { comment: comment }, {
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

export const deaneryApi = {
    approvedApplications: approvedApplications,
    unapprovedApplications: unapprovedApplications,
    role: role,
    acceptRequest: acceptRequest,
    declineRequest: declineRequest,
    exportListStudents: exportListStudents
}