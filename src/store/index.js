import { createStore, compose, applyMiddleware } from "redux";
import { reducers } from "../reducers/index";
import thunk from "redux-thunk";
import { setToken } from "../actions/profile";

export const store = createStore(
    reducers,
    applyMiddleware(thunk)
    // compose(
    //     window.__REDUX_DEVTOOLS_EXTENSION__ &&
    //         window.__REDUX_DEVTOOLS_EXTENSION__()
    // )
);
export default store;
// store.subscribe(() => console.log(store.getState));

