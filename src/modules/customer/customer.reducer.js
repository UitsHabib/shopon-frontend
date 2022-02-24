import Types from "./customer.type";

const initialState = {
    loggedInCustomer: null,
    publicProduct: [],
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.CUSTOMER_LOGIN_FULFILLED:
        case Types.GET_CUSTOMER_PROFILE_FULFILLED: {
            const loggedInCustomer = action.payload.data;
            return {
                ...state,
                loggedInCustomer,
            };
        }
        case Types.GET_PUBLIC_PRODUCT_FULFILLED: {
            const publicProduct = action.payload.data;
            return {
                ...state,
                publicProduct,
            };
        }

        default:
            return state;
    }
}
