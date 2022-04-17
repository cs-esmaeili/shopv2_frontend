import http from "./httpServices";
import config from "../config.json";

export const _categoryListPyramid = () => {
    return http.post(`${config.api_url}categoryListPyramid`, {}, {
        headers: {
            "Action": "categoryListPyramid",
        }
    });
};
export const _categoryListPure = () => {
    return http.post(`${config.api_url}categoryListPure`, {}, {
        headers: {
            "Action": "categoryListPure",
        }
    });
};

export const _addCategory = (data) => {
    return http.post(`${config.api_url}addCategory`, JSON.stringify(data), {
        headers: {
            "Action": "addCategory",
        }
    });
};
export const _deleteCategory = (data) => {
    return http.post(`${config.api_url}deleteCategory`, JSON.stringify(data), {
        headers: {
            "Action": "deleteCategory",
        }
    });
};
