import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { toast } from "react-toastify";

import Table from "../../../core/components/table.component";
import Pagination from "../../../core/components/pagination.component";
import DeleteModal from "../../../core/components/delete-modal.component";

import { deleteProfile, getProfiles } from "../profile.actions";
import ProfileDetails from "./profile-details.component";
import ProfileForm from "./profile-form.component";

const Profiles = () => {
	const location = useLocation();
	const history = useHistory();

	const dispatch = useDispatch();

	const [action, setAction] = useState({});
	const profileData = useSelector(state => state.profileReducer.profileData)

	const columns = [
		{ label: "Title", path: "title", sort: true, style: {width: "15%"}, content: (data, path) => <td> {data[path]}</td> },
		{ label: "Description", path: "description", sort: true, style: {width: "30%"}, content: (data, path) => <td>{data[path]}</td> },
		{ label: "Type", path: "type", sort: true, style: {width: "10%"}, content: (data, path) => <td> {data[path]}</td> },
		{ label: "Created By", path: "createdByUser", style: {width: "10%"}, content: (data, path) => <td>{data[path].first_name + " " + data[path].last_name}</td> },
		{ label: "Updated By", path: "updatedByUser", style: {width: "10%"}, content: (data, path) => <td>{data[path].first_name + " " + data[path].last_name}</td> },
		{ label: "Created At", path: "created_at", style: {width: "10%"}, content: (data, path) => <td>{(new Date(data[path])).toLocaleDateString('en-GB').replace(/\//g, '.')}</td> },
		{ label: "Updated At", path: "updated_at", style: {width: "10%"}, content: (data, path) => <td>{(new Date(data[path])).toLocaleDateString('en-GB').replace(/\//g, '.')}</td> },
		{ 
			label: "Action", 
			path: "action",
			style: {width: "5%"},
			content: (data) => (
				<td>
					<Dropdown className="ms-auto dropdown-customize">
						<Dropdown.Toggle
							variant=""
							className="btn-outline-secondary dropdown-toggle btn-sm py-0 px-1 dropdown-toggle "
						>
							<i className="bi bi-chevron-down fa-lg"></i>
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item onClick={() => setAction({ details: true, profileId: data.id })} > Details </Dropdown.Item>
							<Dropdown.Item onClick={() => setAction({ update: true, profileId: data.id })} > Edit </Dropdown.Item>
							<Dropdown.Item onClick={() => setAction({ deleteWarn: true, profileId: data.id })}> Delete </Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</td>
		)},
	];

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

	useEffect(() => {
		if(location.search) {
			dispatch(getProfiles(location.search));
		} else {
			const urlSearchParams = new URLSearchParams(window.location.search);

            urlSearchParams.set('page', 1);
            urlSearchParams.set('orderBy', "title");
            urlSearchParams.set("limit", 15);
            urlSearchParams.set("orderType", "asc");

            const url = location.pathname + urlSearchParams ? `?${urlSearchParams.toString()}` : '';
            history.push(url);

			dispatch(getProfiles(url));
		}
	}, [action, location]);

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="d-sm-flex justify-content-between align-items-center py-3">
					<h4 className="mb-2 mb-sm-0 cdp-text-primary fw-bold mb-0 mb-sm-0 d-flex align-items-end pe-2">
						Profile list
					</h4>
					<button className="btn btn-secondary text-white ms-2 mt-2 mt-sm-0" onClick={() => setAction({ create: true })}>
						<span className="d-none d-sm-inline-block ps-1">Create new Profile</span>
					</button>
				</div>

				{profileData["profiles"] && profileData["profiles"].length > 0 && 
					<div>
						<Table 
							columns={columns}
							items={profileData.profiles}
						/>

						<Pagination
							start={profileData.metaData.start}
							end={profileData.metaData.end}
							page={profileData.metaData.page}
							total={profileData.metaData.total}
							onPageChange={searchValue => dispatch(getProfiles(searchValue.url))}
						/>
					</div>
				}

				<ProfileDetails
					show={action.details}
					permissionId={action.permissionId}
					onHide={() => setAction({})}
				/>

				<ProfileForm 
					show={action.create || action.update}
					profileId={action.profileId} 
					onHide={() => setAction({})}
				/>

				<DeleteModal 
					show={action.deleteWarn}
					deleteName="Profile"
					onClickDelete={handleDelete}
					onHide={() => setAction({})}
				/> 

				{profileData['profiles'] && profileData['profiles'].length === 0 &&
					<div className="row justify-content-center mt-5 pt-5 mb-3">
						<div className="col-12 col-sm-6 py-4 bg-white shadow-sm rounded text-center">
							<i class="icon icon-team icon-6x text-secondary" />
							<h3 className="fw-bold text-primary pt-4">No Permission Found!</h3>
						</div>
					</div>
				}
				
			</div>
		</div>
	);
};

export default Profiles;
