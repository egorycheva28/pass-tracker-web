import axios from "axios";



const instance = axios.create({
    baseURL: 'https://localhost:7129',

});

function getDetails(id){
    const token = localStorage.getItem("token");
console.log("Токен в localStorage:", token);

    return instance.get(`/request/get-requestInfo/${id}`, {
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

export const requestApi = {
    getDetails: getDetails
}