import Types from './permission.types';
import axios from "axios";

const baseUrl = "http://localhost:5000";

export const getPermissions = (page, limit, orderBy, orderType) => {
    const url = `${baseUrl}/api/permissions`
        + (page ? `?page=${page}` : "")
        + (limit ? `&&limit=${limit}` : "")
        + (orderBy ? `&&orderBy=${orderBy}` : "")
        + (orderType ? `&&orderType=${orderType}` : "");

    return {
        type: Types.GET_PERMISSIONS,
        payload: axios({
            method: "get",
            url, 
            withCredentials: true
        })
    }
};

export function getAllPermissions () {
    return {
        type: Types.GET_PERMISSIONS,
        payload: axios({
            method: 'get',
            url: `${baseUrl}/api/permissions`,
            withCredentials: true
        })
    }
}

export const getPermission = (id) => {
    return {
        type: Types.GET_PERMISSION,
        payload: axios({
            method: "get",
            url: `${baseUrl}/api/permissions/${id}`,
            withCredentials: true
        })
        
    };
}

export const createPermission = (data) => {
    return {
        type: Types.CREATE_PERMISSION,
        payload: axios({
            method: "post",
            url: `${baseUrl}/api/permissions`, 
            data,  
            withCredentials: true 
        })
    };
}

export const updatePermission = (id, data) => {
    return {
        type: Types.UPDATE_PERMISSION,
        payload: axios({
            method: "patch",
            url: `${baseUrl}/api/permissions/${id}`,
            data: data,
            withCredentials: true,
        })
    }
}

export const deletePermission = (id) => {
    return {
        type: Types.DELETE_PERMISSION,
        payload: axios({
            method: "delete",
            url: `${baseUrl}/api/permissions/${id}`, 
            withCredentials: true 
        })
    };
}

export const sortingPermission = (value) => {
    return {
        type: Types.SORT_PERMISSION,
        payload: value,
    }
}

export const permissionId = (id) => {
    return {
        type: Types.PERMISSION_ID,
        payload: id
    }
}

export const deletePermissionStatus = (value) => {
    return {
        type: Types.IS_DELETE_PERMISSION,
        payload: value
    }
}

export const activePageHandle = (page) => {
    return {
        type: Types.ACTIVE_PAGE,
        payload: page
    }
}

export const pageLimit = (value) => {
    return {
        type: Types.PAGE_LIMIT,
        payload: value
    }
}

export const dataFetch = (value) => {
    return {
        type: Types.FETCH_DATA,
        payload: !value
    }
}

export const getServices = () => {
   return {
       type: Types.GET_SERVICES,
       payload: axios({
           method: "get",
           url: `${baseUrl}/api/services`,
           withCredentials: true,
       })
   }
}