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
        console.log("⚡ Запуск refreshToken()...");
    
        try {
            const response = await axios.post('https://localhost:7129/user/login-refresh', {
                refreshToken: localStorage.getItem('refreshToken'),
            });
    
            console.log("🔄 Ответ от сервера refreshToken:", response.data);
    
            if (response.status === 200) {
                console.log("✅ Новый токен получен:", response.data.accessToken);
                localStorage.setItem('token', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                return response.data.accessToken;
            }
        } catch (error) {
            console.error("❌ Ошибка при обновлении токена:", error.response?.data || error.message);
            return null;
        }
    }
    
    

    instance.interceptors.response.use(response => {
        return response;
    }, async error => {
        console.log("⚠️ Перехвачена ошибка запроса:", error);
    
        if (!error.response) {
            console.log("❌ Ошибка: Сервер не ответил! Возможно, проблема с CORS.");
            return Promise.reject(error);
        }
    
        const originalRequest = error.config;
    
        if (error.response.status === 401) {
            console.log("🔁 Ошибка 401! Нужно обновить токен...");
    
            if (!originalRequest._retry) {
                originalRequest._retry = true;
                const newAccessToken = await refreshToken();
    
                if (!newAccessToken) {
                    console.log("❌ Не удалось обновить токен!");
                    return Promise.reject(error);
                }
    
                console.log("✅ Новый Access Token:", newAccessToken);
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return instance(originalRequest);
            }
        }
    
        return Promise.reject(error);
    });
    
    
    return instance;
};

export default createAxiosInstance;
