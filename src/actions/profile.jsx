import axios from "axios";

export const setToken = (token) => {
    return async (dispatch, getState) => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        await dispatch({ type: "SETTOKEN", payload: token });
    };
};
export const setProfileData = (data) => {
    return async (dispatch, getState) => {
        await dispatch({ type: "SETPROFILEDATA", payload: data });
    };
};
