import Types from './profile.types';

const initialState = {
    profiles: [],
    sorting: { path: "id", order: "asc" },
    profile: {},
    activePage: 1,
    limit: 3,
    total: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_PROFILES_FULFILLED: {
            const {profiles, metaData} = action.payload.data;
            return {
                ...state,
                profiles, 
                total: metaData.total
            };
        }
        case Types.GET_PROFILE_FULFILLED: {
            const profile = action.payload.data;
            return { ...state, profile};
        }
        case Types.CREATE_PROFILE_FULFILLED: {
            return { ...state };
        }
        case Types.UPDATE_PROFILE_FULFILLED: {
            return { ...state };
        }
        case Types.DELETE_PROFILE_FULFILLED: {
            return { ...state };
        }
        case Types.SORT_PROFILE: {
            const sorting = action.payload;
            return { ...state, sorting }
        }
        case Types.ACTIVE_PAGE: {
            const activePage = action.payload;
            return { ...state, activePage }
        }
        case Types.PAGE_LIMIT: {
            const limit = action.payload;
            return { ...state, limit }
        }
    }
    return state;
} 