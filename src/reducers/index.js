import { combineReducers } from "redux";
import { tokenReducer } from "../reducers/profile";
import { ProfileReducer } from "../reducers/profile";

export const reducers = combineReducers({
    token: tokenReducer,
    profile: ProfileReducer,
});
