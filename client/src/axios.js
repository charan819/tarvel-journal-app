// axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5500/api", // Your backend base URL
  withCredentials: false, // Important for cookie-based JWT
});

export default instance;
