import Types from "./user.types";

const initialState = {
    loggedInUser: null,
    users: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_USERS_FULFILLED: {
            return {
                ...state,
                users: action.payload.data
            };
        }
    }
    return state;
}