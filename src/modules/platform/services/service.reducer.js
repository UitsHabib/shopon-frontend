import Types from './service.types';

const initialState = {
    serviceData: {},
    service: {}
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_SERVICES_FULFILLED: {
            return {
                ...state,
                serviceData: action.payload.data
            }
        }
        case Types.GET_SERVICE_FULFILLED: {
            return { 
                ...state,
                service: action.payload.data
            }
        }
    } 

    return state;
}
