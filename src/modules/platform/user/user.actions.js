import axios from "axios";
import Types from "./user.types";

// const baseUrl = "http://localhost:5000";

export function getSignedInUserProfile() {
    return {
        type: Types.GET_PROFILE,
        payload: axios({
            method: 'get',
            url: `api/users/profile`,
        })
    };
}

export function login(data) {
    return {
        type: Types.LOGIN,
        payload: axios({
            method: 'post',
            url: `api/login`,
            data,
        })
    };
}

export function logout() {
    return {
        type: Types.LOGOUT,
        payload: axios({
            method: 'get',
            url: `api/logout`,
        })
    };
}

export function getUsers() {
    return {
        type: Types.GET_USERS,
        payload: axios({
            method: "get",
            url: `/api/users`,
        }),
    };
}

export function deleteUser(userId) {
    return {
        type: Types.UPDATE_USER,
        payload: axios({
            method: "delete",
            url: `api/users/${userId}`,
        }),
    };
}

export function createUser(user) {
    return axios.post("http://localhost:5000/api/users", user, {
        withCredentials: true,
    });
}

export function getUser(user_id) {
     console.log("U ID : ", user_id);
    return {
        type: Types.GET_USER,
        payload: axios({
            method: "get",
            url: `api/users/${user_id}`,
        }),
    };
}


export function getProfiles() {
    const url = `/api/profiles`;

    return {
        type: Types.GET_PROFILES,
        payload: axios({
            method: "get",
            url
        }),
    };
}

export function updateUser(usersID, data) {
    return {
        type: Types.UPDATE_USER,
        payload: axios({
            method: "patch",
            url: `api/users/${usersID}`, 
            data,
        }),
    };
    // return axios.patch(`api/users/${usersID}`, data, {
    //     withCredentials: true,
    // });
}
