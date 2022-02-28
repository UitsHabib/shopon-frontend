import React from 'react';
import { Dropdown } from 'react-bootstrap';

const Filter = ({ shopCategories, selectedCategory, onClickFilter }) => {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
                Select Category
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {shopCategories.map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            <Dropdown.Item
                                key={index}
                                variant="success"
                                active={selectedCategory === item}
                                onClick={() => onClickFilter(item)}
                            >
                                {item}
                            </Dropdown.Item>
                        </React.Fragment>
                    );
                })}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default Filter;