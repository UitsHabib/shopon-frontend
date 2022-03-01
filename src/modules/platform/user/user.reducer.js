import Types from "./user.types";

const initialState = {
    loggedInUser: null,
    user: null,
    users: {},
    paginatedUsers: [],
    profiles: [],
    roles: [],
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
                users: {
                    users: action.payload.data.users,
                    userMetaData: action.payload.data.metaData
                },
                // userMetaData: action.payload.data.metaData
                }
        }
        case Types.GET_PAGINATED_USERS_FULFILLED: {
            return {
               ...state,
               paginatedUsers: action.payload.data.users,
               // userMetaData: action.payload.data.metaData
               }
           }
        



        
        case Types.GET_USER_FULFILLED: {
            console.log("in fulfilled :  ",action.payload.data.user);
            return {
                ...state,
                user: action.payload.data,
            };
        }
        case Types.GET_PROFILES_FULFILLED: {
            return {
                ...state,
                profiles: action.payload.data.profiles,
            };
        }
        case Types.GET_ROLES_FULFILLED: {
            return {
                ...state,
                roles: action.payload.data.roles,
            };
        }
    }
    return state;
}
