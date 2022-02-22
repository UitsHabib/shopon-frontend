import axios from 'axios';

const baseUrl = 'http://localhost:5000';

export function getShops() {
    return axios.get(`${baseUrl}/api/shops`);
}

export function deleteShop(shop_id) {
    return axios.delete(`${baseUrl}/api/shops/:${shop_id}`, { withCredentials: 'true' });
}

export function updateShop(targetShop) {
    return axios.patch(`${baseUrl}/api/shops/:${targetShop.shop_id}`, targetShop, { withCredentials: 'true' });
}

export function addNewShop(shop) {
   return axios.post(`${baseUrl}/api/shops`, shop, { withCredentials: 'true' })
}