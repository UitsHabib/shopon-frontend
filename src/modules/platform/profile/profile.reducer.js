import Types from './profile.types';

const initialState = {
    profiles: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_PROFILES_FULFILLED: {
            return {
                ...state,
                profiles: action.payload.data.profiles,
                metaData: action.payload.data.metaData.total
            };
        }
    }
    return state;
} 