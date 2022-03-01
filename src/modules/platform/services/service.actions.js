import axios from "axios";
import Types from './service.types';

export const getServices = (page, limit, orderBy, orderType) => {
    const url = `/api/services?`
        + (page ? `&page=${page}` : "")
        + (limit ? `&limit=${limit}` : "")
        + (orderBy ? `&orderBy=${orderBy}` : "")
        + (orderType ? `&orderType=${orderType}` : "");

    return {
        type: Types.GET_SERVICES,
        payload: axios({
            method: "get",
            url
        })
    }
}