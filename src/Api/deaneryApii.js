import axios from "axios";



const instance = axios.create({
    baseURL: 'https://localhost:7129/deanery',

});

function acceptRequest(id){
    const token = localStorage.getItem("token");

    return instance.post(`/accept-request/${id}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        }
    })
   
    .then(response => {
        if(response.status=== 200){
            console.log(response.data)
            return response.data;
        }
    })
    .catch(error => {
        console.error("Ошибка запроса:", error.response?.data || error.message);
    });
    
    
}

function declineRequest(id){
    const token = localStorage.getItem("token");


    return instance.post(`/decline-request/${id}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        }
    })
   
    .then(response => {
        if(response.status=== 200){
            console.log(response.data)
            return response.data;
        }
    })
    .catch(error => {
        console.error("Ошибка запроса:", error.response?.data || error.message);
    });
}


export const deaneryApi = {
    acceptRequest: acceptRequest,
    declineRequest: declineRequest
}