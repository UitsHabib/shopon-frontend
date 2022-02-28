import axios from "axios";
import Types from "./profile.types";

const baseUrl = "http://localhost:5000";

export function getProfiles(page, limit, orderBy, orderType) {
    const url = `${baseUrl}/api/profiles`
        +(page ? `?page=${page}` : "")
        +(limit ? `&&limit=${limit}` : "")
        +(orderBy ? `&&orderBy=${orderBy}` : "")
        +(orderType ? `&&orderType=${orderType}` : "");

    return {
        type: Types.GET_PROFILES,
        payload: axios({
            method: "get",
            url,
            withCredentials: "true",
        }),
    };
}

export const getProfile = (id) => {
    return {
        type: Types.GET_PROFILE,
        payload: axios({
            method: "get",
            url: `${baseUrl}/api/profiles/${id}`,
            withCredentials: true
        })
        
    };
}

export function getPermissions() {
	return axios.get(`${baseUrl}/api/permissions`, { withCredentials: "true" });
}

export const createProfile = (data) => {
    return {
        type: Types.CREATE_PROFILE,
        payload: axios({
            method: "post",
            url: `${baseUrl}/api/profiles`, 
            data,  
            withCredentials: true 
        })
    };
}

export const updateProfile = (id, title, description, permissions) => {
    const data = {title, description, permissions}
    return {
        type: Types.UPDATE_PROFILE,
        payload: axios({
            method: "patch",
            url: `${baseUrl}/api/profiles/${id}`,
            data,
            withCredentials: true,
        })
    }
}

export const deleteProfile = (id) => {
    return {
        type: Types.DELETE_PROFILE,
        payload: axios({
            method: "delete",
            url: `${baseUrl}/api/profiles/${id}`, 
            withCredentials: true 
        })
    };
}
