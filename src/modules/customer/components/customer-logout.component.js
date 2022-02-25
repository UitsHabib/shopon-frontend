import { useDispatch } from "react-redux";
import { customerlogout } from "../customer.action";

function CustomerLogout(props) {
    const dispatch = useDispatch();

    dispatch(customerlogout());
    window.location.href = "/";
}

export default CustomerLogout;
