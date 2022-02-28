import DashboardItem from "./dashboardItem.component";

const ShopDashboard = (props) => {
	return (
		<div className="d-flex flex-wrap justify-content-start">
			<DashboardItem title="Services" link="/shop-services" />
			<DashboardItem title="Product" link="/shop-products" />
			<DashboardItem title="Orders" link="/shop-orders" />
			<DashboardItem title="Report" link="/shop-report" />
            <DashboardItem title="Review" link="/shop-review" />
		</div>
	);
};

export default ShopDashboard;
