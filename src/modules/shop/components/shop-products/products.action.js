import axios from 'axios';

const baseUrl = 'http://localhost:5000';

export function getAllProducts() {
    return axios.get(`${baseUrl}/api/shops/products/`, { withCredentials: "true" });
}

export function getPaginatedProducts(page, limit) {
    return axios.get(`${baseUrl}/api/shops/products/?page=${page}&&limit=${limit}`, { withCredentials: "true" });
}
