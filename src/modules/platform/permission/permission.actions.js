import Types from './permission.types';
import axios from "axios";

const baseUrl = "http://localhost:5000";

export const getPermissions = () => {
    return axios.get(`${baseUrl}/api/permissions`, { withCredentials: true });
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
    return axios.get(`${baseUrl}/api/permissions/${id}`, { withCredentials: true });
}

export const createPermission = (values) => {
    return axios.post(`${baseUrl}/api/permissions`, values, { withCredentials: true });
}

export const updatePermission = (id, values) => {
    return axios.patch(`${baseUrl}/api/permissions/${id}`, values, { withCredentials: true })
}

export const deletePermission = (id) => {
    return axios.delete(`${baseUrl}/api/permissions/${id}`, { withCredentials: true });
}

export const getServices = () => {
   return axios.get(`${baseUrl}/api/services`, { withCredentials: true })
}