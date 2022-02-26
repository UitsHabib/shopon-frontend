import Types from "./shop-products.types";

const initialState = {
    productList: [],
    totalProducts: 0,
    paginatedProductList: [],
    sortedProductList: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_SHOP_PRODUCT_FULFILLED: {
            const productList = action.payload.data.products;
            const totalProducts = action.payload.data.metaData.total;
            return {
                ...state,
                totalProducts,
                productList
            };
        }
        case Types.GET_PAGINATED_SHOP_PRODUCT_FULFILLED: {
            const paginatedProductList = action.payload.data.products;
            return {
                ...state,
                paginatedProductList
            };
        }
        case Types.GET_SORTED_SHOP_PRODUCT_FULFILLED: {
            const sortedProductList = action.payload.data.products;
            return {
                ...state,
                sortedProductList
            };
        }
    }
    return state;
}