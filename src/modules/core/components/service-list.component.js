import React from 'react';
import { Link } from 'react-router-dom';

import './service-list.component.css';

const ServiceList = () => {
    return (
        <div className="container mt-5" style={{ textDecoration: 'none' }}>
            <ul className="h4">
                <li className=" my-1">
                    <Link
                        to="/platform"
                        style={{ textDecoration: 'none', color: 'black' }}
                    >
                        <span className="hvr-underline-from-left p-2">
                            Users
                        </span>
                    </Link>
                </li>
                <li className="my-1">
                    <span className="hvr-underline-from-left p-2">Profile</span>
                </li>
                <li className="my-2">
                    <Link
                        to="/platform/roles"
                        style={{ textDecoration: 'none', color: 'black' }}
                    >
                        <span className="hvr-underline-from-left p-2">
                            Role
                        </span>
                    </Link>
                </li>
                <li className="my-2">
                    <span className="hvr-underline-from-left p-2">
                        Services
                    </span>
                </li>
                <li className="my-2">
                    <span className="hvr-underline-from-left p-2">
                        Permission
                    </span>
                </li>
            </ul>
        </div>
    );
};

export default ServiceList;
