import http from "./httpServices";
import config from "../config.json";

export const _Admins = () => {
    return http.post(`${config.api_url}admins`, {}, {
        headers: {
            "Action": "admins",
        }
    });
};

export const _AdminRoles = () => {
    return http.post(`${config.api_url}adminRoles`, {}, {
        headers: {
            "Action": "adminRoles",
        }
    });
};
export const _Roles = () => {
    return http.post(`${config.api_url}roles`, {}, {
        headers: {
            "Action": "roles",
        }
    });
};
export const _RolePermissions = (data) => {
    return http.post(`${config.api_url}rolePermissions`, JSON.stringify(data), {
        headers: {
            "Action": "rolePermissions",
        }
    });
};

export const _DeletePermission = (data) => {
    return http.post(`${config.api_url}deletePermission`, JSON.stringify(data), {
        headers: {
            "Action": "deletePermission",
        }
    });
};

export const _DeleteRole = (data) => {
    return http.post(`${config.api_url}deleteRole`, JSON.stringify(data), {
        headers: {
            "Action": "deleteRole",
        }
    });
};

export const _AddPermission = (data) => {
    return http.post(`${config.api_url}addPermission`, JSON.stringify(data), {
        headers: {
            "Action": "addPermission",
        }
    });
};

export const _AddRole = (data) => {
    return http.post(`${config.api_url}addRole`, JSON.stringify(data), {
        headers: {
            "Action": "addRole",
        }
    });
};

export const _MissingPermissions = (data) => {
    return http.post(`${config.api_url}missingPermissions`, JSON.stringify(data), {
        headers: {
            "Action": "missingPermissions",
        }
    });
};


export const _CreatePerson = (data) => {
    return http.post(`${config.api_url}createPerson`,  JSON.stringify(data), {
        headers: {
            "Action": "createPerson",
        }
    });
};

export const _EditPerson = (data) => {
    return http.post(`${config.api_url}editPerson`,  JSON.stringify(data), {
        headers: {
            "Action": "editPerson",
        }
    });
};

export const _personProfile = () => {
    return http.post(`${config.api_url}personProfile`, {}, {
        headers: {
            "Action": "personProfile",
        }
    });
};
