import axios from 'axios';

const baseUrl = 'http://localhost:5000';

export function updateMyProfile(newMyProfile) {
    const newProfile = {
        first_name: newMyProfile.first_name,
        last_name: newMyProfile.last_name,
        status: newMyProfile.status,
        phone: newMyProfile.phone,
    };
    return axios.patch(`${baseUrl}/api/users/${newMyProfile.id}`, newProfile, { withCredentials: true });
}
