import axios from "axios";
//base url to access the entrypoint api
const BASE_URL = "https://localhost:7129";

//access endpoints without authentication
export default axios.create({
  baseURL: BASE_URL,
});

//access endpoints using authentication
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
