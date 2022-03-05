import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";

import { getProfile  } from "../profile.actions";


const ProfileDetails = ({ profileId, ...rest }) => {
    const dispatch = useDispatch();

    const profile = useSelector(state => state.profileReducer.profile)

    useEffect(() => {
        if(profileId) dispatch(getProfile(profileId));
    }, [profileId]);

    return (
        <Modal size="lg" centered {...rest}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h3>Details</h3>
                    <p style={{fontSize: "15px"}}>Here is Profile details.</p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <label>
                        <strong>First Name:</strong>{" "}
                        {profile.first_name}
                        <br />
                        <br />
                        <strong>
                            Last Name:
                        </strong>{" "}
                        {profile.last_name}
                        <br />
                        <br />
                        <strong>Email:</strong>{" "}
                        {profile.email}
                        <br />
                        <br />
                        <strong>Status:</strong>{" "}
                        {profile.status}
                        <br />
                        <br />
                        <strong>
                            Created At:
                        </strong>{" "}
                        {profile.created_at}
                        <br />
                        <br />
                        <strong>
                            Updated At:
                        </strong>{" "}
                        {profile.updated_at}
                        <br />
                    </label>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ProfileDetails;