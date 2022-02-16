import axios from 'axios';

const baseUrl = 'http://localhost:5000';

export function getUsers() {
    return axios.get(`${baseUrl}/api/users`, { withCredentials: 'true' });
}

export function deleteUser(userId) {
    return axios.delete(`${baseUrl}/api/users/${userId}`, { withCredentials: true });
}
