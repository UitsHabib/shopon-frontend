import axios from "axios";
import Types from "./user.types";

export function getSignedInUserProfile() {
    return {
        type: Types.GET_PROFILE,
        payload: axios({
            method: 'get',
            url: `/api/users/profile`,
        })
    };
}

export function login(data) {
    console.log(data);
    return {
        type: Types.LOGIN,
        payload: axios({
            method: 'post',
            url: `/api/login`,
            data,
        })
    };
}

export function logout() {
    return {
        type: Types.LOGOUT,
        payload: axios({
            method: 'get',
            url: `/api/logout`,
        })
    };
}

export function getUsers(page, limit, orderBy, orderType) {
    const url =`api/users/?page=${page}` 
    + (limit ? `&limit=${limit}` : "") 
    + (orderBy ? `&orderBy=${orderBy}` : "") 
    + (orderType ? `&orderType=${orderType}` : "");

    return {
        type: Types.GET_USERS,
        payload: axios({
            method: "get",
            url,
        }),
    };
}

export function deleteUser(userId) {
    console.log(userId);
    return {
        type: Types.DELETE_USER,
        payload: axios({
            method: "delete",
            url: `/api/users/${userId}`
        })
    };
}

export function createUser(data) {
    return {
        type: Types.CREATE_USER,
        payload: axios({
            method: "post",
            url: `/api/users`,
            data,
        })
    };
    // return axios.post("http://localhost:5000/api/users", user, {
    //     withCredentials: true,
    // });
}

export function getUser(user_id) {
    return {
        type: Types.GET_USER,
        payload: axios({
            method: "get",
            url: `api/users/${user_id}`,
        }),
    };
}

export function getProfiles() {
    console.log("in action profile");
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
            url: `/api/users/${usersID}`,
            data,
        })
    };
}
