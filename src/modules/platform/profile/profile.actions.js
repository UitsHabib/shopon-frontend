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

export const sortingProfile = (value) => {
    return {
        type: Types.SORT_PROFILE,
        payload: value,
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

export function getPermissions() {
	return axios.get(`${baseUrl}/api/permissions`, { withCredentials: "true" });
}

export function createProfile(data) {
	return axios.post(`${baseUrl}/api/profiles`, data, {
        withCredentials: true,
    });
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
