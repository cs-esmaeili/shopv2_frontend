import http from "./httpServices";
import config from "../config.json";

export const _createPost = (data) => {
    return http.post(`${config.api_url}createPost`, data, { headers: {
        "Action": "createPost",
    }});
};
export const _postList = () => {
    return http.post(`${config.api_url}postList`, {}, { headers: {
        "Action": "postList",
    }});
};

export const _changePostStatus = (data) => {
    return http.post(`${config.api_url}changePostStatus`, JSON.stringify(data), { headers: {
        "Action": "changePostStatus",
    }});
};

export const _deletePost = (data) => {
    return http.post(`${config.api_url}deletePost`, JSON.stringify(data), { headers: {
        "Action": "deletePost",
    }});
};
export const _updatePost = (data) => {
    return http.post(`${config.api_url}updatePost`, data, { headers: {
        "Action": "updatePost",
    }});
};
