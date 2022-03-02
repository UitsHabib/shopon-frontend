import Types from "./product.types";

const initialState = {
    productData: {},
    product: {},
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_PRODUCTS_FULFILLED: {
            const productData = {products: action.payload.data.products, metaData: {
                page: action.payload.data.metaData.page,
                total: action.payload.data.metaData.total,
                start: action.payload.data.metaData.start,
                end: action.payload.data.metaData.end
            }};
            return {
                ...state,
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