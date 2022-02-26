import Types from "./role.types";

const initialState = {
    roleData: [],
    role: {}
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_ROLES_FULFILLED: {
            return {
                ...state,
                roleData: action.payload.data
            };
        }
        case Types.GET_ROLE_FULFILLED: {
            return {
                ...state,
                role: action.payload.data
            };
        }
    }

    return state;
}