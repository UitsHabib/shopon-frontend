import axios from "axios";
import Types from "./user.types";

const baseUrl = "http://localhost:5000";

export function getSignedInUserProfile() {
    return {
        type: Types.GET_PROFILE,
        payload: axios({
            method: 'get',
            url: `${baseUrl}/api/users/profile`,
            withCredentials: true,
        })
    };
}

export function login(data) {
    console.log(data);
    return {
        type: Types.LOGIN,
        payload: axios({
            method: 'post',
            url: `${baseUrl}/api/login`,
            data,
            withCredentials: true,
        })
    };
}

export function logout() {
    return {
        type: Types.LOGOUT,
        payload: axios({
            method: 'get',
            url: `${baseUrl}/api/logout`,
            withCredentials: true,
        })
    };
}

export function getUsers() {
    return {
        type: Types.GET_USERS,
        payload: axios({
            method: "get",
            url: `${baseUrl}/api/users`,
            withCredentials: true,
        }),
    };
}

export function deleteUser(userId) {
    return axios.delete(`${baseUrl}/api/users/${userId}`, {
        withCredentials: true,
    });
}

export function createUser(user) {
    return axios.post("http://localhost:5000/api/users", user, {
        withCredentials: true,
    });
}

export function getUser(user_id) {
    return axios.get(`${baseUrl}/api/users/${user_id}`, {
        withCredentials: true,
    });
}

export function getRoles() {
    return axios.get(`${baseUrl}/api/roles`, { withCredentials: true });
}

export function getProfiles() {
    return axios.get(`${baseUrl}/api/profiles`, { withCredentials: true });
}

export function updateUser(usersID, updatedUser) {
    return axios.patch(`${baseUrl}/api/users/${usersID}`, updatedUser, {
        withCredentials: true,
    });
}
