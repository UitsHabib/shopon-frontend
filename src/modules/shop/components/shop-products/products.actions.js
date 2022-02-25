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
    //console.log(page, limit);
    return axios.get(
        `${baseUrl}/api/shops/products/?page=${page}&&limit=${limit}`,
        { withCredentials: "true" }
    );
}
