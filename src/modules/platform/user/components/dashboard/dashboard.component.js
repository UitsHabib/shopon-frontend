import DashboardItem from "./DashboardItem.component";

const Dashboard = (props) => {
	return (
		<div>
			<DashboardItem title="Platform" link="/platform" />
			<DashboardItem title="Customer" link="/customer" />
			<DashboardItem title="Shop" link="/shop" />
			<DashboardItem title="Complain" link="/complain" />
		</div>
	);
};

export default Dashboard;
