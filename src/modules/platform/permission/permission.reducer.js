import Types from './permission.types';

const initialState = {
    permissionData: {},
    permission: {},
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_PERMISSIONS_FULFILLED: {
            return {
                ...state,
                permissionData: action.payload.data
            };
        }
        case Types.GET_PERMISSION_FULFILLED: {
            return {
                ...state,
                permission: action.payload.data
            }
        }
        default: 
            return state;
    } 
}
