import Types from "./products.types";

const initialState = {
    productList: [],
    totalProducts: 0,
    product: {},

    productData: {},
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_PRODUCTS_FULFILLED: {
            const productList = action.payload.data.products;
            const totalProducts = action.payload.data.metaData.total;
            const productData = action.payload.data;
            return {
                ...state,
                totalProducts,
                productList,
                productData
            };
        }
        case Types.GET_PRODUCT_FULFILLED: {
            const product = action.payload.data;
            return {
                ...state,
                product,
            };
        }
    }
    return state;
}