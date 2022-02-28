import axios from "axios";
import Types from './permission.types';


export const getPermissions = (page, limit, orderBy, orderType) => {
    const url = `/api/permissions`
        + (page ? `?page=${page}` : "")
        + (limit ? `&&limit=${limit}` : "")
        + (orderBy ? `&&orderBy=${orderBy}` : "")
        + (orderType ? `&&orderType=${orderType}` : "");

    return {
        type: Types.GET_PERMISSIONS,
        payload: axios({
            method: "get",
            url
        })
    }
};

export const getPermission = (id) => {
    return {
        type: Types.GET_PERMISSION,
        payload: axios({
            method: "get",
            url: `/api/permissions/${id}`
        })
    }
}

export const createPermission = (data) => {
    return {
        type: Types.CREATE_PERMISSION,
        payload: axios({
            method: "post",
            url: `/api/permissions`, 
            data
        })
    };
}

export const updatePermission = (id, data) => {
    return {
        type: Types.UPDATE_PERMISSION,
        payload: axios({
            method: "patch",
            url: `/api/permissions/${id}`,
            data: data
        })
    }
}

export const deletePermission = (id) => {
    return {
        type: Types.DELETE_PERMISSION,
        payload: axios({
            method: "delete",
            url: `/api/permissions/${id}`
        })
    };
}


export function getAllPermissions () {
    return {
        type: Types.GET_PERMISSIONS,
        payload: axios({
            method: 'get',
            url: `/api/permissions`
        })
    }
}