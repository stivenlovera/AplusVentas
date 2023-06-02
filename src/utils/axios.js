import axios from "axios";
import { request } from "http";
const asyncLocalStorage = {
    setItem: async function (key, value) {
        return localStorage.setItem(key, value);
    },
    getItem: async function (key) {
        return localStorage.getItem(key);
    }
};

export const AxiosRequest = async () => {
    axios.interceptors.request.use(
        async (config) => {
            config.headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await asyncLocalStorage.getItem('token')}`,
            };
            return config;
        }
    );
}

/*No valido */
const axiosInstance = axios.create();
axiosInstance.interceptors.response.use(response => response, error => Promise.reject(error.response && error.response.data || "Something went wrong"));
axiosInstance.interceptors.request.use((request) => {
    request.headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJleHAiOjE2ODQ0NTY3OTZ9.vyvLMLCdpMtU2nV39EBkN20tVcrryb85iNDb76TyQNc`
    };
    return request;
})
export default axiosInstance;