import axios from 'axios';

export function updateMyProfile(newMyProfile) {
    return axios.patch(`/api/users/${newMyProfile.id}`, newMyProfile);
}
