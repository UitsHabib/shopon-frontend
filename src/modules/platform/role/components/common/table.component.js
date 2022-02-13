import React from "react";

import TableBody from "./table-body.component";
import TableHeader from "./table-header.component";

const Table = (props) => {
    const { items, columns, sorters, onSort } = props;

    return (
        <>
            <table className="table table-hover">
                <TableHeader
                    columns={columns}
                    sorters={sorters}
                    onSort={onSort}
                />
                <TableBody items={items} columns={columns} />
            </table>
        </>
    );
};

export default Table;
