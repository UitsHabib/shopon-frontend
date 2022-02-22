import Types from "./user.types";

const initialState = {
    loggedInUser: null,
    users: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.LOGIN_FULFILLED:
        case Types.GET_PROFILE_FULFILLED: {
            const loggedInUser = action.payload.data;
            return {
                ...state,
                loggedInUser
            };
        }
        case Types.GET_USERS_FULFILLED: {
            return {
                ...state,
                users: action.payload.data
            };
        }
    }
    return state;
}