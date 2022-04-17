import http from "./httpServices";
import config from "../config.json";


export const _publicFolderFiles = (data) => {
    return http.post(`${config.api_url}publicFolderFiles`, JSON.stringify(data), {
        headers: {
            "Action": "publicFolderFiles",
        }
    });
};
export const _publicFolderFilesLinks = (data) => {
    return http.post(`${config.api_url}publicFolderFilesLinks`, JSON.stringify(data), {
        headers: {
            "Action": "publicFolderFilesLinks",
        }
    });
};
export const _deletePublicFolderOrFile = (data) => {
    return http.post(`${config.api_url}deletePublicFolderOrFile`, JSON.stringify(data), {
        headers: {
            "Action": "deletePublicFolderOrFile",
        }
    });
};
export const _createPublicFolder = (data) => {

    return http.post(`${config.api_url}createPublicFolder`, JSON.stringify(data), {
        headers: {
            "Action": "createPublicFolder",
        }
    });
};
export const _publicFileInformation = (data) => {

    return http.post(`${config.api_url}publicFileInformation`, JSON.stringify(data), {
        headers: {
            "Action": "publicFileInformation",
        }
    });
};
export const _renamePublicFolder = (data) => {

    return http.post(`${config.api_url}renamePublicFolder`, JSON.stringify(data), {
        headers: {
            "Action": "renamePublicFolder",
        }
    });
};
export const _movePublicFileAndFolder = (data) => {

    return http.post(`${config.api_url}movePublicFileAndFolder`, JSON.stringify(data), {
        headers: {
            "Action": "movePublicFileAndFolder",
        }
    });
};
export const _renamePublicFileAndFolder = (data) => {

    return http.post(`${config.api_url}renamePublicFileAndFolder`, JSON.stringify(data), {
        headers: {
            "Action": "renamePublicFileAndFolder",
        }
    });
};
export const _savePublicFiles = (data , uploadLisener , doSomething) => {
    doSomething();
    return http.post(`${config.api_url}savePublicFiles`, data, {
        onUploadProgress: function (progressEvent) {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            uploadLisener(percentCompleted);
        },
        headers: {
            "Action": "savePublicFiles",
        }
    });
};
