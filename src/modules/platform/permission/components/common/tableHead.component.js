const TableHead = ({ columns, sorting, onClickSort }) => {
    const handleSort = ({ path, sort }) => {
        if (!sort) return null;

        if (sorting.path === path) {
            if (sorting.order === "asc") {
                onClickSort({ path, order: "desc" });
            } else {
                onClickSort({ path, order: "asc" });
            }
        } else {
            onClickSort({ path, order: "asc" });
        }
    };
    
    console.log()

    return (
        <thead style={{ backgroundColor: '#144d43', color: '#ffffff' }}>
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
