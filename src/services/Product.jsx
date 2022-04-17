import http from "./httpServices";
import config from "../config.json";

export const _CreateProduct = (data) => {
    return http.post(`${config.api_url}createProduct`, data);
};
export const _ProductList = () => {
    return http.post(`${config.api_url}productList`);
};

export const _DeleteProduct = (data) => {
    return http.post(`${config.api_url}deleteProduct`, JSON.stringify(data));
};

export const _EditProductInfo = (data) => {
    return http.post(`${config.api_url}editproducinfo`, JSON.stringify(data), {
        headers: {
            "Action": "editProducInfo",
        }
    });
};
export const _ProductImageList = (data) => {
    return http.post(`${config.api_url}productimagelist`, JSON.stringify(data), {
        headers: {
            "Action": "productImageList",
        }
    });
};
export const _DeleteProductImage = (data) => {
    return http.post(`${config.api_url}deleteproductimage`, JSON.stringify(data), {
        headers: {
            "Action": "deleteProductImage",
        }
    });
};
export const _AddProductImage = (data) => {
    return http.post(`${config.api_url}addproductimage`, data, {
        headers: {
            "Action": "addProductImage",
        }
    });
};
