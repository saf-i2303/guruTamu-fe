import axios from "axios";
import cookie from "react-cookies";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  
});

const apiKey = cookie.load("apiKey");

if (apiKey) {
  http.defaults.headers.common["Authorization"] = `Bearer ${apiKey}`;
}   

export default http;

