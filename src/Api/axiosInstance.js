import axios from "axios";

const createAxiosInstance = (prefix = '') => {
    const instance = axios.create({
        baseURL: `https://localhost:7129/${prefix}`,
    });

    instance.interceptors.request.use(config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });

    async function refreshToken() {
        try {
            const response = await axios.post('https://localhost:7129/user/login-refresh', {
                token: localStorage.getItem('refreshToken'),
            });

            if (response.status === 200) {
                localStorage.setItem('token', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                return response.data.accessToken;
            }
        } catch (error) {
            console.log("Ошибка обновления токена:", error.response?.data?.error);
            return null;
        }
    }

    instance.interceptors.response.use(response => {
        return response;
    }, async error => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const newAccessToken = await refreshToken();

            if (newAccessToken) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                return instance(originalRequest);
            }
        }

        return Promise.reject(error);
    });

    return instance;
};

export default createAxiosInstance;
