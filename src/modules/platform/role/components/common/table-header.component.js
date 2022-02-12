import React from "react";

const TableHeader = (props) => {
    const { columns, sorters, onSort } = props;

    const handleSort = ({ key, sortable }) => {
        if (!sortable) return;

        if (sorters.key === key) {
            if (sorters.order === "asc") {
                onSort({ key, order: "desc" });
            } else {
                onSort({ key, order: "asc" });
            }
        } else {
            onSort({ key, order: "asc" });
        }
    };

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
                            onClick={() => handleSort(item)}
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
