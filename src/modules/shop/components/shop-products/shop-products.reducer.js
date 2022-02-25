import Types from "./shop-products.types";

const initialState = {
    productList: [],
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_SHOP_PRODUCT_FULFILLED: {
            const productList = action.payload.data.products;
            return {
                ...state,
                productList
            };
        }
    }
    return state;
}