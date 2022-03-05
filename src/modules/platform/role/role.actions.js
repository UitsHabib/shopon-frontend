import axios from 'axios';
import Types from './role.types';

export function getRoles(page, limit, orderBy, orderType) {
    const url = `/api/roles`
        + (page ? `?page=${page}` : "1")
        + (limit ? `&&limit=${limit}` : "")
        + (orderBy ? `&&orderBy=${orderBy}` : "")
        + (orderType ? `&&orderType=${orderType}` : "");

    return {
        type: Types.GET_ROLES,
        payload: axios({
            method: 'get',
            url
        })
    };
}

export function getRole(roleId) {
    return {
        type: Types.GET_ROLE,
        payload: axios({
            method: 'get',
            url: `/api/roles/${roleId}`
        })
    };
}

export function deleteRole(roleId) {
    return {
        type: Types.DELETE_ROLE,
        payload: axios({
            method: 'delete',
            url: `/api/roles/${roleId}`
        })
    };
}

export function createRole(data) {

    return {
        type: Types.CREATE_ROLE,
        payload: axios({
            method: 'post',
            url: `/api/roles`,
            data
        })
    };
}

export function updateRole(roleId, data) {
    const url = `/api/roles/${roleId}`;

    return {
        type: Types.UPDATE_ROLE,
        payload: axios({
            method: 'patch',
            url,
            data
        })
    };
}