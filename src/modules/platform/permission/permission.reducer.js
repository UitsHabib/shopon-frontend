import Types from './permission.types';

const initialState = {
    permissionData: {}
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_PERMISSIONS_FULFILLED: {
            return {
                ...state,
                permissionData: action.payload.data
            };
        }
    }

    return state;
}