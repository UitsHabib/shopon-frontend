import React from 'react';
import { Link } from 'react-router-dom';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import { useRouteMatch } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const PureBreadcrumbs = ({ breadcrumbs }) => {
	const pathName = useLocation().pathname.split('/').pop();
	const { id } = useRouteMatch().params;

	return (
		<nav>
			<ol className="breadcrumb">
				{breadcrumbs.map(({ breadcrumb, match }, index) => {
					if (id) return null;
					if (breadcrumb.props.children.toLowerCase() === pathName) {
						return (
							<li className="breadcrumb-item active" key={match.url}>
								{breadcrumb}
							</li>
						);
					} else {
						return (
							<li className="breadcrumb-item active" key={match.url}>
								<Link to={match.url || ''}>{breadcrumb}</Link>
								{index < breadcrumbs.length - 1}
							</li>
						);
					}
				})}
			</ol>
		</nav>
	);
};

export default withBreadcrumbs()(PureBreadcrumbs);
