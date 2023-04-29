import axios from "axios";
import { request } from "http";
const axiosInstance = axios.create();
axiosInstance.interceptors.response.use(response => response, error => Promise.reject(error.response && error.response.data || "Something went wrong"));
axiosInstance.interceptors.request.use(request =>{
    request.headers={
        'Content-Type': 'application/json',
        'Authorization': `Bearer `
    };
    return request;
})
export default axiosInstance;