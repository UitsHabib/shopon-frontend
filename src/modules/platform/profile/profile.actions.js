import axios from "axios";
import Types from "./profile.types";

export const getProfiles = (searchParams) => {
    const url = `api/profiles`
        + (searchParams ? searchParams : "");

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

export const updateProfile = (id, data) => {
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
