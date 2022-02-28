import React from "react";
import { NavLink } from 'react-router-dom';

export default function NoMatch() {
    return (
        <div>
            <h4>Page Not Found!</h4>
            <p>We are sorry! but the page you requested cannot be found.</p>
            <NavLink to="/dashboard">Back to Dashboard</NavLink>
        </div>
    
    );
}
