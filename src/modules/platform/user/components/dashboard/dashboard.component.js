import DashboardItem from "./DashboardItem.component";

const Dashboard = (props) => {
	return (
		<div className="d-flex flex-wrap justify-content-start">
			<DashboardItem title="Platform" link="/platform" />
			<DashboardItem title="Customer" link="/customer" />
			<DashboardItem title="Shop" link="/shop" />
			<DashboardItem title="Complaint" link="/complaint" />
		</div>
	);
};

export default Dashboard;
