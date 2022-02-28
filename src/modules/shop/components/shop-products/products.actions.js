import axios from "axios";
import Types from "./products.types";

export function getProducts(page, limit, orderBy, orderType) {
    const url =
        `/api/shops/products/?page=${page}` +
        (limit ? `&limit=${limit}` : "") +
        (orderBy ? `&orderBy=${orderBy}` : "") +
        (orderType ? `&orderType=${orderType}` : "");
        //console.log(url);

    return {
        type: Types.GET_PRODUCTS,
        payload: axios({
            method: "get",
            url,
        }),
    };
}

export function getProduct(productID) {
    return {
        type: Types.GET_PRODUCT,
        payload: axios({
            method: "get",
            url: `/api/shops/products/${productID}`,
        }),
    };
}

export function addNewProduct(newProduct) {
    return {
        type: Types.ADD_PRODUCT,
        payload: axios({
            method: "post",
            url: `/api/shops/products`,
            data: newProduct
        }),
    };
}

export function deleteProduct(targetProductID) {
    return {
        type: Types.DELETE_PRODUCT,
        payload: axios({
            method: "delete",
            url: `/api/shops/products/${targetProductID}`,
        }),
    };
}

export function updateProduct(updatedProduct) {
    return {
        type: Types.UPDATE_PRODUCT,
        payload: axios({
            method: "patch",
            url: `/api/shops/products/${updatedProduct.id}`,
            data: updatedProduct
        }),
    };
}
