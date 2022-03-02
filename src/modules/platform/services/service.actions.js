import axios from "axios";
import Types from './service.types';

export const getServices = (searchParams) => {
    const url = `/api/services?`
        + (searchParams ? searchParams : "");

    return {
        type: Types.GET_SERVICES,
        payload: axios({
            method: "get",
            url
        })
    }
}

export const getService = (id) => {
    return {
        type: Types.GET_SERVICE,
        payload: axios({
            method: "get",
            url: `/api/services/${id}`
        })
    }
}