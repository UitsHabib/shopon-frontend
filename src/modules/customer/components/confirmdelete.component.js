function ConfirmDelete({ handleCancel, deleteProfile, isDelete, item }) {
	return (
		<div className="modal" style={{ display: isDelete ? 'block' : 'none' }}>
			<div className="modal-dialog">
				<div
					className="modal-content"
					style={{
						textAlign: 'center',
						width: '100%',
						marginLeft: '10%',
						marginTop: '25%',
						border: '1px solid gray',
						boxShadow: '1px 1px 10px gray',
						borderRadius: '10px',
						padding: '20px',
					}}
				>
					<div className="container">
						<h1>Delete Account</h1>
						<p>
							Are you sure you want to delete{' '}
							{item.first_name + ' ' + item.last_name} Account?
						</p>

						<div className="clearfix">
							<button
								type="button"
								className="btn btn-warning"
								onClick={() => {
									handleCancel(item);
								}}
							>
								Cancel
							</button>{' '}
							<button
								type="button"
								className="btn btn-danger"
								onClick={() => {
									deleteProfile(item);
								}}
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ConfirmDelete;
