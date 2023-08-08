import axios from "axios";

const instance = axios.create({
    baseURL: process.env.API_URL || 'http://127.0.0.1:1024/api'
});

export default instance;