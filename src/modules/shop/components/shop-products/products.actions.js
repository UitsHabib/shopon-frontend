import axios from "axios";
import Types from "./shop-products.types";

const baseUrl = "http://localhost:5000";

export function getAllProducts(page, limit, orderBy, orderType) {
    const url = `${baseUrl}/api/shops/products/?page=${page}` 
        + (limit ? `&limit=${limit}` : '')
        + (orderBy ? `&orderBy=${orderBy}` : '')
        + (orderType ? `&orderType=${orderType}` : '');

    return {
        type: Types.GET_SHOP_PRODUCT,
        payload: axios({
            method: "get",
            url,
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
}

export function addNewProduct(newProduct) {
    console.log(newProduct);
   return axios.post(`${baseUrl}/api/shops/products`, newProduct, { withCredentials: true })
}

export function deleteProduct(targetProductID) {
    return axios.delete(`${baseUrl}/api/shops/products/${targetProductID}`, {
        withCredentials: true,
    });
}

export function updateProduct(updatedProduct) {
    return axios.patch(
        `${baseUrl}/api/shops/products/${updatedProduct.id}`,
        updatedProduct,
        { withCredentials: true }
    );
}
