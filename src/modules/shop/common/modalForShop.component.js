import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

export function ModalForShops(props) {
	const {
		targetShop,
		type,
		showDetail,
		setShowDetail,
		updateDetail,
		setUpdateDetail,
		deleteDetail,
		setDeleteDetail,
		deleteShopData,
	} = props;

	const handleShowDetail = () => setShowDetail(!showDetail);
	const handleUpdateDetail = () => setUpdateDetail(!updateDetail);
	const handleDeleteDetail = () => {
		deleteShopData(targetShop);
		setDeleteDetail(!deleteDetail);
	};
	const handleDeleteDetailClose = () => {
		setDeleteDetail(!deleteDetail);
	};

	return (
		<>
			{type === 'show' && (
				<>
					<Modal show={showDetail} onHide={handleShowDetail}>
						<Modal.Header closeButton>
							<Modal.Title>Shop Details</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<ul className="list-group">
								<li className="list-group-item">
									Shop ID: {targetShop.shop_id}
								</li>
								<li className="list-group-item">
									Shop Name: {targetShop.shop_name}
								</li>
								<li className="list-group-item">
									Category: {targetShop.shop_type}
								</li>
							</ul>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleShowDetail}>
								Close
							</Button>
						</Modal.Footer>
					</Modal>
				</>
			)}
            {/* incomplete */}
			{type === 'update' && (
				<>
					<Modal show={updateDetail} onHide={handleUpdateDetail}>
						<Modal.Header closeButton>
							<Modal.Title>Update Shop Details</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleUpdateDetail}>
								Close
							</Button>
						</Modal.Footer>
					</Modal>
				</>
			)}
			{type === 'delete' && (
				<>
					<Modal show={deleteDetail} onHide={handleDeleteDetail}>
						<Modal.Header closeButton>
							<Modal.Title>Delete Shop</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<ul className="list-group">
								<li className="list-group-item">
									Shop ID: {targetShop.shop_id}
								</li>
								<li className="list-group-item">
									Shop Name: {targetShop.shop_name}
								</li>
								<li className="list-group-item">
									Category: {targetShop.shop_type}
								</li>
							</ul>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="danger" onClick={handleDeleteDetail}>
								Delete
							</Button>
							<Button variant="primary" onClick={handleDeleteDetailClose}>
								Close
							</Button>
						</Modal.Footer>
					</Modal>
				</>
			)}
		</>
	);
}
