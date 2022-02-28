import Types from './profile.types';

const initialState = {
    profileData: [],
    profile: {},
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_PROFILES_FULFILLED: {
            const profileData = action.payload.data;
            return {
                ...state,
                profileData,
            };
        }
        case Types.GET_PROFILE_FULFILLED: {
            const profile = action.payload.data;
            return { 
                ...state, 
                profile
            };
        }
    }
    return state;
} 