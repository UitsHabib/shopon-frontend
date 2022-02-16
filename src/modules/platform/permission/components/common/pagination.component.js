import _ from "lodash";

const Pagination = ({ totalLength, count, activePage, onActive, onCount }) => {
    const totalPages = Math.ceil(totalLength / count);
    const pages = _.range(1, totalPages + 1, 1);

    if(totalLength <= count) return null;

    return (
        <nav className="d-flex">
            <ul className="pagination">
                <li
                    className="page-item"
                    onClick={() => activePage > 1 && onActive(activePage - 1)}
                >
                    <span className="page-link">Previous</span>
                </li>
                {pages.map((page) => (
                    <li
                        className={`page-item ${
                            activePage === page && "active"
                        }`}
                        key={page}
                        onClick={() => onActive(page)}
                    >
                        <span className="page-link">{page}</span>
                    </li>
                ))}
                <li
                    className="page-item"
                    onClick={() =>
                        activePage < totalPages && onActive(activePage + 1)
                    }
                >
                    <span className="page-link">Next</span>
                </li>
            </ul>
            <label htmlFor="count">
                Rows:
            <select className="count" id="count" onChange={(e) => onCount(e.target.value)}>
                    <option value="1">3</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                </label>
        </nav>
    );
};

export default Pagination;
