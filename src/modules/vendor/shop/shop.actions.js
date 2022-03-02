import axios from "axios";
import Types from "./shop.types";

export function getSignedInShopProfile() {
    return {
        type: Types.GET_SHOP_PROFILE,
        payload: axios({
            method: 'get',
            url: `/api/shops/profile`,
        })
    };
}

export function shopLogin(data) {
    return {
        type: Types.SHOP_LOGIN,
        payload: axios({
            method: 'post',
            url: `/api/shops/login`,
            data,
        })
    };
}

export function shopLogout() {
    return {
        type: Types.SHOP_LOGOUT,
        payload: axios({
            method: 'get',
            url: `/api/shops/logout`,
        })
    };
}

export function updateShopProfile(updatedShop) {
    return {
        type: Types.GET_SHOP_PROFILE,
        payload: axios({
            method: 'put',
            url: `/api/shops/profile`,
            data: updatedShop,
        })
    };
}

export function shopRegister(newShop) {
    return {
        type: Types.REGISTER_SHOP_PROFILE,
        payload: axios({
            method: 'post',
            url: `/api/shops`,
            data: newShop,
        })
    };
}
