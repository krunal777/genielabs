import axios from 'axios';

// Create Axios instance
const api = axios.create({
    baseURL: "https://tq055pyk5f.execute-api.us-east-2.amazonaws.com/prod"
});

// Interceptor to add headers dynamically before each request
api.interceptors.request.use((config) => {
    if (sessionStorage.getItem("accessToken")) {
        config.headers["AccessToken"] = sessionStorage.getItem("accessToken");
        config.headers["IdToken"] = sessionStorage.getItem("idToken");
    }
    config.params = {
        ...config.params,
        API_KEY:  sessionStorage.getItem("API_KEY")
    };

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
