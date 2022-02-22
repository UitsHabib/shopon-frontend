import { useDispatch } from 'react-redux';
import { logout } from '../user.actions';

function Logout(props) {
    const dispatch = useDispatch();

    dispatch(logout());
    window.location.href = "/login";
}

export default Logout;