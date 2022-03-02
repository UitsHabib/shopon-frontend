import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";

import { getService } from "../service.actions";

const ServiceDetails = ({ serviceId, ...rest }) => {
	const dispatch = useDispatch();

    const service = useSelector(state => state.serviceReducer.service)

    useEffect(() => {
        if(serviceId) dispatch(getService(serviceId));
    }, [serviceId]);

	return (
		<Modal size="lg" centered {...rest}>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">Here is service details.</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div>
                    <label>
                        <strong>Title:</strong>{" "}
                        {service.title}
                        <br />
                        <br />
                        <strong>
                            Slug:
                        </strong>{" "}
                        {service.slug}
                        <br />
                        <br />
                        <strong>
                            Created At:
                        </strong>{" "}
                        {service.created_at}
                        <br />
                        <br />
                        <strong>
                            Updated At:
                        </strong>{" "}
                        {service.updated_at}
                        <br />
                    </label>
                </div>
			</Modal.Body>
		</Modal>
	);
};

export default ServiceDetails;
