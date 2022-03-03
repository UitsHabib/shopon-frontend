import Types from "./user.types";

const initialState = {
    loggedInUser: null,
    userData: [],
    user: {},
    profileData:[],
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.LOGIN_FULFILLED:
        case Types.GET_PROFILE_FULFILLED: {
            const loggedInUser = action.payload.data;
            return {
                ...state,
                loggedInUser,
            };
        }
        case Types.GET_USERS_FULFILLED: {
             return {
                ...state,
                userData: action.payload.data,
            };
        }
        
        case Types.GET_USER_FULFILLED: {
            return {
                ...state,
                user: action.payload.data,
            };
        }
        case Types.GET_PROFILES_FULFILLED: {
            return {
                ...state,
                profileData: action.payload.data,
            };
        }
    }
    return state;
}
