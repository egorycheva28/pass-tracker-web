import createAxiosInstance from "./axiosInstance";

const api = createAxiosInstance("");

function getDetails(id) {
    return api.get(`/request/get-requestInfo/${id}`, {
        headers: {
            Accept: "application/json"
        }
    })

        .then(response => {
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(error => {
            console.error("Ошибка запроса:", error.response?.data || error.message);
        });
}

function prolongRequest(id, finishDate) {
    const isoDate = new Date(finishDate).toISOString();

    return api.put(`/deanery/prolong-request/${id}`, { finishDate: isoDate })

        .then(response => {
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(error => {
            console.error("Ошибка запроса:", error.response?.data || error.message);
            throw error;
        });
}

export const requestApi = {
    getDetails: getDetails,
    prolongRequest: prolongRequest,
}