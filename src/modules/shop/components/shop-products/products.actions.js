import axios from "axios";
import Types from './shop-products.types';

const baseUrl = "http://localhost:5000";

export function getAllProducts() {
    return {
        type: Types.GET_SHOP_PRODUCT,
        payload: axios({
            method: "get",
            url: `${baseUrl}/api/shops/products`,
            withCredentials: "true",
        }),
    };
}

export function getPaginatedProducts(page, limit) {
    return {
        type: Types.GET_PAGINATED_SHOP_PRODUCT,
        payload: axios({
            method: "get",
            url: `${baseUrl}/api/shops/products/?page=${page}&&limit=${limit}`,
            withCredentials: "true",
        }),
    };
}

export function getSortedProducts(page, limit, orderBy, orderType) {
    return {
        type: Types.GET_SORTED_SHOP_PRODUCT,
        payload: axios({
            method: "get",
            url: `${baseUrl}/api/shops/products/?page=${page}&&limit=${limit}&&orderBy=${orderBy}&&orderType=${orderType}`,
            withCredentials: "true",
        }),
    };
    //console.log(page, limit);
}
