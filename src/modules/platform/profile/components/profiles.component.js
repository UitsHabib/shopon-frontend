import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import {toast} from "react-toastify";
import moment from "moment";

import {
	deleteProfile,
	getProfiles,
} from "../profile.actions";
import Pagination from "./common/pagination.component";
import ProfileForm from "./profile-form.component";
import DeleteModal from "./common/delete-modal.component";
import ProfileDetails from "./profile-details.component";
import { useHistory, useLocation } from "react-router-dom";

const Profiles = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const [action, setAction] = useState({});
    const profileData = useSelector(state => state.profileReducer.profileData)

    const handleDelete = () => {
        dispatch(deleteProfile(action.profileId))
            .then(response => {
                toast(
                    'Profile Deleted Successfully', 
                    { background: '#8329C5', color: '#ffffff' }
                )
                setAction({});
            })
            .catch(error => {
                toast.error(
                    'Error happened',
                    { background: '#8329C5', color: '#ffffff' }
                );
                setAction({});
            })
    };

    const handleClickPage = (searchValue) => {
        dispatch(getProfiles(searchValue.url));
    }

	const query = new URLSearchParams(location.search);
	const page = query.get('page');
	const limit = query.get('limit');
	const orderBy = query.get('orderBy');
	const orderType = query.get('orderType');

	const changeUrl = query => {
        const { orderBy, orderType, page, limit } = query || {};

        const search = new URLSearchParams();

        orderBy && search.append('orderBy', orderBy);
        orderType && search.append('orderType', orderType);
        page && search.append('page', page);

        history.push(location.pathname + search ? `?${search.toString()}` : '');
	}

	useEffect(() => {
		dispatch(getProfiles(page, limit, orderBy, orderType));
	}, [action, location]);

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="d-sm-flex justify-content-between align-items-center py-3">
                        <h4 className="mb-2 mb-sm-0 cdp-text-primary fw-bold mb-0 mb-sm-0 d-flex align-items-end pe-2">
                            Profile list
                        </h4>
                        <button className="btn btn-secondary text-white ms-2 mt-2 mt-sm-0" onClick={() => setAction({ create: true })}>
                            <span className="d-none d-sm-inline-block ps-1">Create new profile</span>
                        </button>
                    </div>

                    {profileData['profiles'] && profileData['profiles'].length > 0 &&
                        <div>
                            {console.log("ProfileData", profileData)}
                            <table className="table">
                                <thead style={{ backgroundColor: '#144d43', color: '#ffffff' }}>
                                    <tr>
                                        <th scope="col" width="15%"><span onClick={() => changeUrl(1, 'title')}>Title</span></th>
                                        <th scope="col" width="15%"><span onClick={() => changeUrl(1, 'description')}>Description</span></th>
                                        <th scope="col" width="15%"><span onClick={() => changeUrl(1, 'createdByUser')}>Created By</span></th>
                                        <th scope="col" width="15%"><span onClick={() => changeUrl(1, 'created_at')}>Created At</span></th>                                      
                                        <th scope="col" width="15%"><span onClick={() => changeUrl(1, 'updatedByUser')}>Updated By</span></th>
                                        <th scope="col" width="15%"><span onClick={() => changeUrl(1, 'updated_at')}>Updated at</span></th>
                                        <th scope="col" width="15%">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {profileData.profiles.map(row => (
                                        <tr key={row.id}>
                                            <td className="text-break">{row.title}</td>
                                            <td className="text-break">{row.description}</td>
                                            <td className="text-break">{row.createdByUser.first_name + " " + row.createdByUser.last_name}</td>
                                            <td>{moment(row.created_at).format("lll")}</td>
                                            <td className="text-break">{row.updatedByUser.first_name + " " + row.updatedByUser.last_name}</td>
                                            <td>{moment(row.updated_at).format("lll")}</td>
                                            <td data-for="Action">
                                                <Dropdown className="ms-auto dropdown-customize">
                                                    <Dropdown.Toggle
                                                        variant=""
                                                        className="btn-outline-secondary dropdown-toggle btn-sm py-0 px-1 dropdown-toggle "
                                                    >
                                                        <i className="bi bi-chevron-down fa-lg"></i>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={() => setAction({ details: true, profileId: row.id })} > Details </Dropdown.Item>
                                                        <Dropdown.Item onClick={() => setAction({ update: true, profileId: row.id })} > Edit </Dropdown.Item>
                                                        <Dropdown.Item onClick={() => setAction({ deleteWarn: true, profileId: row.id })}> Delete </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div>
                                <Pagination
                                    start={profileData.metaData.start}
                                    end={profileData.metaData.end}
                                    page={profileData.metaData.page}
                                    total={profileData.metaData.total}
                                    onClickPage={handleClickPage}
                                />
                            </div>
                        </div>
                    }

                    <ProfileDetails
                        show={action.details}
                        profileId={action.profileId}
                        onHide={() => setAction({})}
                    />

                    <ProfileForm 
                        show={action.create || action.update}
                        profileId={action.profileId} 
                        onHide={() => setAction({})}
                    />

                    <DeleteModal 
                        show={action.deleteWarn}
                        onClickDelete={handleDelete}
                        onHide={() => setAction({})}
                    /> 

                    {profileData['profiles'] && profileData['profiles'].length === 0 &&
                        <div className="row justify-content-center mt-5 pt-5 mb-3">
                            <div className="col-12 col-sm-6 py-4 bg-white shadow-sm rounded text-center">
                                <i class="icon icon-team icon-6x text-secondary"></i>
                                <h3 className="fw-bold text-primary pt-4">No Profile Found!</h3>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    );
};

export default Profiles;