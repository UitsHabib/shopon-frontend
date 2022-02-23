import axios from "axios";
// import Types from "./profile.types";

const baseUrl = "http://localhost:5000";

export function getUsers() {
	return axios.get(`${baseUrl}/api/users`, { withCredentials: "true" });
}

export function getProfiles() {
	return axios.get(`${baseUrl}/api/profiles`, { withCredentials: "true" });
}

// export function getProfiles() {
//     return {
//         type: Types.GET_PROFILES,
//         payload: axios({
//             method: "get",
//             url: `${baseUrl}/api/profiles`,
//             withCredentials: "true",
//         }),
//     };
// }


export function getPermissions() {
	return axios.get(`${baseUrl}/api/permissions`, { withCredentials: "true" });
}

export function createProfile(data) {
	return axios.post(`${baseUrl}/api/profiles`, data, {
        withCredentials: true,
    });
}

export function updateProfile(id, title, description, permissions) {
	return axios.patch(
		`${baseUrl}/api/profiles/${id}`,
		{ title, description, permissions },
		{ withCredentials: true }
	);
}

export function deleteProfile(id) {
	return axios.delete(
        `${baseUrl}/api/profiles/${id}`,
        { withCredentials: true }
    );
}
