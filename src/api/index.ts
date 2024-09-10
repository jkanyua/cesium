import axios from "axios";

const api = axios.create({
  baseURL: "/",
  timeout: 1000,
});

export default api;
