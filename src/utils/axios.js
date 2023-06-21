import axios from "axios";
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
                'X-Requested-With': 'XMLHttpRequest',
                'Access-Control-Allow-Origin': '*',
                'ngrok-skip-browser-warning': true,
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
        'X-Requested-With': 'XMLHttpRequest',
        'ngrok-skip-browser-warning': true,
        'Access-Control-Allow-Origin': '*',
    };
    return request;
})
export default axiosInstance;