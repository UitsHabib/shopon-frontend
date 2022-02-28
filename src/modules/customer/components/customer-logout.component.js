import { useDispatch } from "react-redux";
import { customerLogout } from "../customer.actions";

function CustomerLogout(props) {
    const dispatch = useDispatch();

    dispatch(customerLogout());
    window.location.href = "/";
}

export default CustomerLogout;
