import axios from "axios";

const instance = axios.create({
    baseURL: 'https://blog.kreosoft.space/api/account/'
});

function loginUser(email, password){
    return instance.post("/login", { email, password })
    .then(response => {
        if(response.status === 200){
            return response.data;
        }
    })
    .catch(error => {
        console.log(error.response.data.error)
    });
}

function getProfile(){
    return instance.get("/profile")
    .then(response => {
        if(response=== 200){
            return response.data;
        }
    })
    .catch(error => {
        console.log(error.response.data.error)
    });
    
}

export const userApi = {
    
    loginUser: loginUser,
    getProfile: getProfile
}