import axios from "axios";
import Types from "./user.types";

const baseUrl = "http://localhost:5000";

export function getSignedInUserProfile() {
    return {
        type: Types.GET_PROFILE,
        payload: axios({
            method: 'get',
            url: `${baseUrl}/api/users/profile`,
            withCredentials: "true",
        })
    };
}

export function login(data) {
    return {
        type: Types.LOGIN,
        payload: axios({
            method: 'post',
            url: `${baseUrl}/api/login`,
            data,
            withCredentials: "true",
        })
    };
}

export function logout() {
    return {
        type: Types.LOGOUT,
        payload: axios({
            method: 'get',
            url: `${baseUrl}/api/logout`,
            withCredentials: "true",
        })
    };
}

export function getUsers() {
    return {
        type: Types.GET_USERS,
        payload: axios({
            method: "get",
            url: `${baseUrl}/api/users`,
            withCredentials: "true",
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
    // console.log("U ID : ", user_id);

    return {
        type: Types.GET_USER,
        payload: axios({
            method: "get",
            url: `${baseUrl}/api/users/${user_id}`,
            withCredentials: "true",
        }),
    };
}

export function getProfiles() {
    console.log("in action profile");
  return {
      type: Types.GET_PROFILES,
      payload: axios({
          method: "get",
          url: `${baseUrl}/api/profiles`,
          withCredentials: "true",
      }),
  };
}

export function getRoles() {
    console.log("in action roles");
  return {
      type: Types.GET_ROLES,
      payload: axios({
          method: "get",
          url: `${baseUrl}/api/roles`,
          withCredentials: "true",
      }),
  };
}



export function updateUser(usersID, updatedUser) {
    return axios.patch(`${baseUrl}/api/users/${usersID}`, updatedUser, {
        withCredentials: true,
    });
}
