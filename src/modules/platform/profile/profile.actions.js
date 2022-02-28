import axios from "axios";
import Types from "./profile.types";

export function getProfiles(page, limit, orderBy, orderType) {
    const url = `/api/profiles`
        +(page ? `?page=${page}` : "")
        +(limit ? `&&limit=${limit}` : "")
        +(orderBy ? `&&orderBy=${orderBy}` : "")
        +(orderType ? `&&orderType=${orderType}` : "");

    return {
        type: Types.GET_PROFILES,
        payload: axios({
            method: "get",
            url
        }),
    };
}

export const getProfile = (id) => {
    return {
        type: Types.GET_PROFILE,
        payload: axios({
            method: "get",
            url: `/api/profiles/${id}`,
        })
    };
}

export function getPermissions() {
	return axios.get(`/api/permissions`);
}

export const createProfile = (data) => {
    return {
        type: Types.CREATE_PROFILE,
        payload: axios({
            method: "post",
            url: `/api/profiles`, 
            data,   
        })
    };
}

export const updateProfile = (id, title, description, permissions) => {
    const data = {title, description, permissions}
    return {
        type: Types.UPDATE_PROFILE,
        payload: axios({
            method: "patch",
            url: `/api/profiles/${id}`,
            data
        })
    }
}

export const deleteProfile = (id) => {
    return {
        type: Types.DELETE_PROFILE,
        payload: axios({
            method: "delete",
            url: `/api/profiles/${id}`,  
        })
    };
}
