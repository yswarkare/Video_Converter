import axios from "axios";

const defaults = {
    baseURL: "/api"
}

export const api = axios.create(defaults);

const defaults_02 = {
    baseURL: "/api",
    headers: {
        "Content-Type": "multipart/form-data",
    }
}

export const formApi = axios.create(defaults_02);

const defaults_03 = {
    baseURL: "/api",
    headers: {
        "Content-Type" : "video/mp4",
        "Accept-Ranges" : "bytes"
    }
}

export const download = axios.create(defaults_03);