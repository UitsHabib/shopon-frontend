import React from "react";

const TableHeader = (props) => {
    const { columns, sorters, onSort } = props;

    const getSortIcon = (item, sorters) => {
        if (sorters.key === item.key) {
            if (sorters.order === "asc") {
                return <i className="bi bi-sort-down" />;
            } else {
                return <i className="bi bi-sort-down-alt" />;
            }
        } else return null;
    };

    return (
        <>
            <thead>
                <tr>
                    {columns.map((item) => (
                        <th
                            scope="col"
                            key={item.label}
                            onClick={() => onSort(sorters, item.key)}
                        >
                            {item.label} {getSortIcon(item, sorters)}
                        </th>
                    ))}
                </tr>
            </thead>
        </>
    );
};

export default TableHeader;
