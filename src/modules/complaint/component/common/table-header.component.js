const TableHeader = ({ columns, onSort, sortColumn }) => {
    function handleSort({ path, sorting }) {
        if (!sorting) return;

        if (sortColumn.path === path) {
            if (sortColumn.order === "asc") {
                onSort({ path, order: "desc" });
            } else {
                onSort({ path, order: "asc" });
            }
        } else {
            onSort({ path, order: "asc" });
        }
    }

    function getIcon(path) {
        if (sortColumn.path === path) {
            if (sortColumn.order === "asc") {
                return <i className="bi bi-arrow-down"></i>;
            } else return <i className="bi bi-arrow-up"></i>;
        } else return null;
    }
    return (
        <thead>
            <tr>
                {columns.map((col, index) => {
                    return (
                        <th key={index} onClick={() => handleSort(col)}>
                            {" "}
                            {col.label} {getIcon(col.path)}
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
}

export default TableHeader;