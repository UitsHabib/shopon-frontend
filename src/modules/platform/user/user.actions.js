import axios from "axios";
import Types from "./user.types";

export function getSignedInUserProfile() {
    return {
        type: Types.GET_PROFILE,
        payload: axios({
            method: 'get',
            url: `/api/users/profile`,
            withCredentials: "true",
        })
    };
}

export function login(data) {
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
    return {
        type: Types.UPDATE_USERS,
        payload: axios({
            method: "delete",
            url: `/api/users/${userId}`
        })
    };
}

export function createUser(userInfo) {
    console.log(userInfo);
    return {
        type: Types.CREATE_USER,
        payload: axios({
            method: "post",
            url: `/api/users`,
            userInfo
        })
    };
}

export function getUser(user_id) {
    console.log('in get user function');
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

// export function getRoles() {
//     console.log("in action roles");
//   return {
//       type: Types.GET_ROLES,
//       payload: axios({
//           method: "get",
//           url: `${baseUrl}/api/roles`,
//           withCredentials: "true",
//       }),
//   };
// }



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
