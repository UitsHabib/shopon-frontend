import Types from "./customer.type";

const initialState = {
    loggedInCustomer: null,
    publicProduct: [],
    cart: [],
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

        case Types.CUSTOMER_LOGOUT_FULFILLED: {
            let newState = [...state];
            newState.loggedInCustomer = null;
            return newState;
        }
        case Types.ADD_PRODUCT_CART: {
            const cart = action.payload;
            return {
                ...state,
                cart,
            };
        }
        default:
            return state;
    }
}
