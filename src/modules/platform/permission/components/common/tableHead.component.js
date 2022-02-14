const TableHead = ({ columns, sorting, onSort }) => {
    const handleSort = ({ path, sort }) => {
        if (!sort) return null;

        if (sorting.path === path) {
            if (sorting.order === "asc") {
                onSort({ path, order: "desc" });
            } else {
                onSort({ path, order: "asc" });
            }
        } else {
            onSort({ path, order: "asc" });
        }
    };
    
    console.log()

    return (
        <thead>
            <tr>
                {columns.map((column) => (
                    <th
                        scope="col"
                        key={column.label}
                        onClick={() => handleSort(column)}
                    >
                        {column.label}
                        {sorting.path === column.path ? (
                            sorting.order === "asc" ? (
                                <i className="fas fa-arrow-down" />
                            ) : (
                                <i className="fas fa-arrow-up" />
                            )
                        ) : null}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHead;
