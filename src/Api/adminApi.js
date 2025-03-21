import createAxiosInstance from "./axiosInstance";

const api = createAxiosInstance("admin");

function getUnconfirmedUsers(params) {
    return api.get(`/unconfirmed?page=${params.page}&size=${params.size}`)

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

function deleteUser(id) {
    return api.delete(`/user?id=${id}`)

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

function confirmUser(id, role) {
    return api.post(`/confirm-user?id=${id}&role=${role}`)
        .then(response => {
            console.log("Catalog Data:", response.data);
            if (response.status === 200) {
                console.log("Catalog Data:", response.data);
                return response.data;
            }
        })
        .catch(error => {
            console.error("Ошибка подтверждения:", error.response?.data || error.message);
        });
}

export const adminApi = {
    getUnconfirmedUsers: getUnconfirmedUsers,
    deleteUser: deleteUser,
    confirmUser: confirmUser
}