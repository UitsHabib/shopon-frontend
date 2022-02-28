import React from 'react';
import { Link } from 'react-router-dom';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import { useRouteMatch } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './breadcrumb.css';

const PureBreadcrumbs = ({ breadcrumbs }) => {
  const pathName = useLocation().pathname.split('/').pop();
  const { id } = useRouteMatch().params;

  return (
    <nav className="mx-3 my-2">
      <ol className="breadcrumbs m-0 p-0">
        {breadcrumbs.map(({ breadcrumb, match }, index) => {
          if (id) return null;
          if (breadcrumb.props.children.toLowerCase() === pathName) {
            return (
              <span className="breadcrumbs__item is-active" key={match.url}>
                {breadcrumb}
              </span>
            );
          } else {
            return (
              <span className="breadcrumbs__item" key={match.url}>
                <Link to={match.url || ''}>{breadcrumb}</Link>
                {index < breadcrumbs.length - 1}
              </span>
            );
          }
        })}
      </ol>
    </nav>
  );
};

export default withBreadcrumbs()(PureBreadcrumbs);
