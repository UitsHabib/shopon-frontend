import { Dropdown, DropdownButton } from "react-bootstrap";

const Filter = ({ shopCategories, selectedCategory, onClickFilter }) => {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
               {selectedCategory}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {shopCategories.map((item, index) => {
                    return (
                        <Dropdown.Item
                            key={index}
                            variant="success"
                            active={selectedCategory === item}
                            onClick={() => onClickFilter(item)}
                        >
                            {item}
                        </Dropdown.Item>
                    );
                })}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default Filter;
