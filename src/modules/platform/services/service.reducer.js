import Types from './service.types';

const initialState = {
    serviceData: {}
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_SERVICES_FULFILLED: {
            return {
                ...state,
                serviceData: action.payload.data
            }
        }
    } 

    return state;
}
