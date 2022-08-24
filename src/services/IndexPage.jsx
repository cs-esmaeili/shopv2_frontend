import http from "./httpServices";
import config from "../config.json";

export const _sliderImages = () => {
    return http.post(`${config.api_url}sliderImages`, {}, {
        headers: {
            "Action": "sliderImages",
        }
    });
};