import axios from "axios";
import Types from "./shop.types";

const baseUrl = "http://localhost:5000";

export function getSignedInShopProfile() {
    return {
        type: Types.GET_SHOP_PROFILE,
        payload: axios({
            method: 'get',
            url: `${baseUrl}/api/shops/profile`,
            withCredentials: "true",
        })
    };
}

export function shopLogin(data) {
    return {
        type: Types.SHOP_LOGIN,
        payload: axios({
            method: 'post',
            url: `${baseUrl}/api/shops/login`,
            data,
            withCredentials: "true",
        })
    };
}

export function shopLogout() {
    return {
        type: Types.SHOP_LOGOUT,
        payload: axios({
            method: 'get',
            url: `${baseUrl}/api/shops/logout`,
            withCredentials: "true",
        })
    };
}

export function updateShopProfile(updatedShop) {
    return axios.put(`${baseUrl}/api/shops/profile`, updatedShop, {
        withCredentials: true,
    });
}
