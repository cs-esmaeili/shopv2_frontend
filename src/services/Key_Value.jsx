import http from "./httpServices";
import config from "../config.json";

export const _addKey = (data) => {
    return http.post(`${config.api_url}addKey`, JSON.stringify(data), {
        headers: {
            "Action": "addKey",
        }
    });
};
export const _deleteKey = (data) => {
    return http.post(`${config.api_url}deleteKey`, JSON.stringify(data), {
        headers: {
            "Action": "deleteKey",
        }
    });
};
