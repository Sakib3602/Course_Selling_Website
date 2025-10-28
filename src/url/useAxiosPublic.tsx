import axios from "axios";

 
 const axiosPublic = axios.create({
    // baseURL: "http://localhost:3000"
    // baseURL: ""
    baseURL: import.meta.env.VITE_BASE_URL
 })

const useAxiosPublic = () => {
    return axiosPublic;
}

export default useAxiosPublic;