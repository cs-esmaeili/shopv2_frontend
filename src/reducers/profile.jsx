export const tokenReducer = (state = null, action) => {
    switch (action.type) {
        case "SETTOKEN":
            return action.payload;
        default:
            return state;
    }
};
export const ProfileReducer = (state = null, action) => {
    switch (action.type) {
        case "SETPROFILEDATA":
            return action.payload;
        default:
            return state;
    }
};
