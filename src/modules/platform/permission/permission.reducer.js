import Types from "./permission.types";

const initialState = {
    permissions: [],
    sorting: { path: "id", order: "asc" },
    permission: {},
    isDeletePermission: false,
    permissionId: null,
    activePage: 1,
    limit: 3,
    fetchData: true,

    services: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_PERMISSIONS_FULFILLED: {
            const permissions = action.payload.data;

            return { ...state, permissions};
        }
        case Types.SORT_PERMISSION: {
            const sorting = action.payload;

            return { ...state, sorting }
        }
        case Types.GET_PERMISSION_FULFILLED: {
            const permission = action.payload.data;

            return { ...state, permission};
        }
        case Types.CREATE_PERMISSION_FULFILLED: {
            return { ...state };
        }
        case Types.UPDATE_PERMISSION_FULFILLED: {
            return { ...state };
        }
        case Types.DELETE_PERMISSION_FULFILLED: {
            return { ...state };
        }
        case Types.PERMISSION_ID: {
            const permissionId = action.payload;

            return { ...state, permissionId }
        }
        case Types.IS_DELETE_PERMISSION: {
            const isDeletePermission = action.payload;

            return { ...state, isDeletePermission }
        }
        case Types.ACTIVE_PAGE: {
            const activePage = action.payload;

            return { ...state, activePage }
        }
        case Types.PAGE_LIMIT: {
            const limit = action.payload;

            return { ...state, limit }
        }
        case Types.FETCH_DATA: {
            return { ...state, fetchData: action.payload }
        }
        case Types.GET_SERVICES_FULFILLED: {
            const { services } = action.payload.data;

            return { ...state, services }
        }
        default:
            return state;
    }
}

export default reducer;