import http from "./httpServices";
import config from "../config.json";

export const _sliderImages = () => {
    return http.post(`${config.api_url}sliderImages`, {}, {
        headers: {
            "Action": "sliderImages",
        }
    });
};
export const _popularPosts = () => {
    return http.post(`${config.api_url}popularPosts`, {}, {
        headers: {
            "Action": "popularPosts",
        }
    });
};
export const _lastVideo = () => {
    return http.post(`${config.api_url}lastVideo`, {}, {
        headers: {
            "Action": "lastVideo",
        }
    });
};
export const _top3Recent = () => {
    return http.post(`${config.api_url}top3Recent`, {}, {
        headers: {
            "Action": "top3Recent",
        }
    });
};
export const _latestScreenshots = () => {
    return http.post(`${config.api_url}latestScreenshots`, {}, {
        headers: {
            "Action": "latestScreenshots",
        }
    });
};
export const _latestPictures = () => {
    return http.post(`${config.api_url}latestPictures`, {}, {
        headers: {
            "Action": "latestPictures",
        }
    });
};
