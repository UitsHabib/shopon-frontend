import React from "react";

const Rating = ({ rating }) => {
    return (
        <React.Fragment>
            <li className="fa fa-star"></li>
            <li className="fa fa-star"></li>
            <li className="fa fa-star"></li>
            <li className="fa fa-star"></li>
            <li className="fa fa-star-o"></li>
        </React.Fragment>
    );
};

export default Rating;
