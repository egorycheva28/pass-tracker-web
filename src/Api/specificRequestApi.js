import axios from "axios";
import createAxiosInstance from "./axiosInstance";

const api = createAxiosInstance("");

function getDetails(id){


    return api.get(`/request/get-requestInfo/${id}`, {
        headers: {
            Accept: "application/json"
        }
    })
   
    .then(response => {
        if(response.status=== 200){
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