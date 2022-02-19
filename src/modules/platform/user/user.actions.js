import axios from 'axios';

const baseUrl = 'http://localhost:5000';

export function getUsers() {
  return axios.get(`${baseUrl}/api/users`, { withCredentials: 'true' });
}

export function deleteUser(userId) {
  return axios.delete(`${baseUrl}/api/users/${userId}`, {
    withCredentials: true,
  });
}

export function getProfiles() {
  return axios.get(`${baseUrl}/api/profiles`, {
    withCredentials: true,
  });
}

export function getRoles() {
  return axios.get(`${baseUrl}/api/roles`, {
    withCredentials: true,
  });
}

export function createUser(user) {
  return axios.post('http://localhost:5000/api/users', user, {
    withCredentials: true,
  });
}

export function getUser(user_id) {
  return axios.get(`${baseUrl}/api/users/${user_id}`, {
    withCredentials: true,
  });
}
// export function  getRoles()  {
//     return axios.get(`${baseUrl}/api/roles`,{ withCredentials: true });
// }

// export function getProfiles() {
//   return axios.get(`${baseUrl}/api/profiles`, { withCredentials: true });
// }

export function updateUser(usersID, updatedUser) {
  return axios.patch(`${baseUrl}/api/users/${usersID}`, updatedUser, {
    withCredentials: true,
  });
}
