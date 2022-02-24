import axios from "axios";
import Types from "./customer.type";

const baseUrl = "http://localhost:5000";

export function getPublicProduct() {
    return {
        type: Types.GET_PUBLIC_PRODUCT,
        payload: axios({
            method: "get",
            url: `${baseUrl}/api/products`,
            withCredentials: "true",
        }),
    };
}

export function customerLogin(data) {
    return {
        type: Types.CUSTOMER_LOGIN,
        payload: axios({
            method: "post",
            url: `${baseUrl}/api/customers/login`,
            data,
            withCredentials: "true",
        }),
    };
}
