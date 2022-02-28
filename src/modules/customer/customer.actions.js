import axios from "axios";
import Types from "./customer.type";

export function getPublicProduct() {
    return {
        type: Types.GET_PUBLIC_PRODUCT,
        payload: axios({
            method: "get",
            url: `/api/products`,
        }),
    };
}

export function customerLogin(data) {
    return {
        type: Types.CUSTOMER_LOGIN,
        payload: axios({
            method: "post",
            url: `/api/customers/login`,
            data,
        }),
    };
}

export function customerlogout() {
    return {
        type: Types.CUSTOMER_LOGOUT,
        payload: axios({
            method: "get",
            url: `/api/customers/logout`,
        }),
    };
}
export function signUpCustomer(customer) {
    return axios.post(`/api/customers`, customer);
}
export function getSignedInCustomerProfile() {
    return {
        type: Types.GET_CUSTOMER_PROFILE,
        payload: axios({
            method: "get",
            url: `/api/customers/profile`,
        }),
    };
}

export function customerLogout() {
    return {
        type: Types.CUSTOMER_LOGOUT,
        payload: axios({
            method: "get",
            url: `/api/customers/logout`,
        }),
    };
}
