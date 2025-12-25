import axios from "axios";

 
 const axiosPrivate = axios.create({
    baseURL: "http://localhost:3000",
    // baseURL: ""
    // baseURL: import.meta.env.VITE_BASE_URL_PROD
    // withCredentials: true,
 })

const useAxiosPrivate = () => {
    return axiosPrivate;
}

export default useAxiosPrivate;