import { useDispatch } from 'react-redux';
import { shopLogout } from '../shop.actions';

function ShopLogout(props) {
    const dispatch = useDispatch();

    dispatch(shopLogout());
    window.location.href = "/shop-login";
}

export default ShopLogout;