import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory, useRouteMatch } from "react-router-dom";

import useServices from "../hooks/useServices";

import { Table, Pagination } from "../common/components";
import ServiceDetails from "./serviceDetails.component";

import servicesMetadata from "./services.metadata";

const Services = ({ history, location: { search } }) => {
	const queriedPage = new URLSearchParams(search).get("page");
	const paginate = { currentPage: queriedPage || 1, itemsPerPage: 2 };
	// const [paginate, updatePage] = useState({ currentPage: 1, itemsPerPage: 2 });
	const { services, meta } = useServices(paginate);
	const [serviceDetail, setServiceDetail] = useState();

	const updatedServicesMetadata = {
		...servicesMetadata,
		action: {
			render: (_, service) => (
				<Button onClick={() => setServiceDetail(service)}>Details</Button>
			),
		},
	};
	const totalNoOfItems = meta?.total || 0;

	return (
		<div className="d-flex flex-column">
			<h1>Services</h1>
			<Table data={services} metadata={updatedServicesMetadata} />
			<Pagination
				currentPage={paginate.currentPage}
				totalNoOfItems={totalNoOfItems}
				itemsPerPage={paginate.itemsPerPage}
				updateCurrentPage={(page) =>
					history.push(`/platform/services?page=${page}`)
				}
			/>
			{serviceDetail ? (
				<ServiceDetails
					service={serviceDetail}
					onHide={() => setServiceDetail(null)}
				/>
			) : null}
		</div>
	);
};

export default Services;
