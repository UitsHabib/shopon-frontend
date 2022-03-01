import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import moment from "moment";

const ProfileDetails = ({ permissionId, ...rest }) => {
    const profile = useSelector(state => state.profileReducer.profile)

    return (
        <Modal 
            {...rest}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <h3>Details</h3>
                    <p style={{fontSize: "15px"}}>Here is profiles details.</p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <label>
                        <strong>Title:</strong>{" "}
                        {profile.title}
                        <br />
                        <br />
                        <strong>
                            Description:
                        </strong>{" "}
                        {profile.description}
                        <br />
                        <br />
                        <strong>Slug:</strong>{" "}
                        {profile.slug}
                        <br />
                        <br />
                        <strong>
                            Created At:
                        </strong>{" "}
                        {moment(profile.created_at).format("lll")}
                        <br />
                        <br />
                        <strong>
                            Updated At:
                        </strong>{" "}
                        {moment(profile.updated_at).format("lll")}
                        <br />
                        <br />
                        <strong>
                            Profile Permissions:
                        </strong>
                        {profile?.profile_permissions?.map(
                            (profile_permissions) => (
                                <p
                                    key={profile_permissions.id}
                                    style={{
                                        marginLeft:
                                            "50px",
                                    }}
                                >
                                    {profile_permissions.permission.title}
                                </p>
                            )
                        )}
                        <br />
                    </label>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ProfileDetails;