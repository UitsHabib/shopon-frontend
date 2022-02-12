import { Link } from "react-router-dom";
import { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import DeleteUser from "./deleteUser.service";

const UpdateDeleteComponent = (props) => {
    const { path } = useRouteMatch();
    const nPath = path + '/updateUser';
    const [val, setVal] = useState(0);
    return (
        <>
            <div style={{ margin: "auto", textAlign: "center" }}>
                <input
                    style={{ margin: "20px" }}
                    type="number"
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                ></input>

                <br />

                <Link  className="btn btn-success" to={{ pathname: nPath , state: { prevPath: props.location.pathname , data : val }}}>
                    Update Admin
                </Link>

               
                <br />
                <button className="btn btn-danger"
                    onClick={() => {
                        DeleteUser(val);
                    }}
                    style={{ margin: "20px" }}
                >
                    Delete user
                </button>
            </div>
        </>
    );
};

export default UpdateDeleteComponent;
