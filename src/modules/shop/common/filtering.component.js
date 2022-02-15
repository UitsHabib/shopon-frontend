const Filter = ({ items, selectedCategory, onClickFilter }) => {
    return (
        <div>
            <ul className="list-group">
                {items.map((item, index) => {
                    return (
                        <li
                            key={index}
                            onClick={() => onClickFilter(item)}
                            className={
                                selectedCategory === item
                                    ? "list-group-item active"
                                    : "list-group-item"
                            }
                        >
                            {item}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Filter;
