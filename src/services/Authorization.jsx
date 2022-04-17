import http from "./httpServices";
import config from "../config.json";

export const LogIn = (data) => {
    return http.post(`${config.api_url}login`, JSON.stringify(data));
};

export const LogOut = (data) => {
    return http.post(`${config.api_url}logout`, JSON.stringify(data));
};
export const CheckToken = () => {
    return http.post(`${config.api_url}checkToken`, {});
};
export const _ChangeData = (data) => {
    return http.post(`${config.api_url}changedata`, JSON.stringify(data), {
        headers: {
            "Action": "changeData",
        }
    });
};
