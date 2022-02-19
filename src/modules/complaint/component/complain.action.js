import axios from 'axios';

const baseUrl = 'http://localhost:5000';

export function getComplainData() {
    return axios.get('complains-data.json');
}
