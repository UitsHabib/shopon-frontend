import _ from "lodash";

const Pagination = ({ totalLength, count, activePage, onClickActive, onChangeCount }) => {
    const totalPages = Math.ceil(totalLength / count);
    const pages = _.range(1, totalPages + 1, 1);

    if(totalLength <= count) return null;

    return (
        <nav className="d-flex">
            <ul className="pagination">
                <li
                    className="page-item"
                    onClick={() => activePage > 1 && onClickActive(activePage - 1)}
                >
                    <span className="page-link">Previous</span>
                </li>
                {pages.map((page) => (
                    <li
                        className={`page-item ${
                            activePage === page && "active"
                        }`}
                        key={page}
                        onClick={() => onClickActive(page)}
                    >
                        <span className="page-link">{page}</span>
                    </li>
                ))}
                <li
                    className="page-item"
                    onClick={() =>
                        activePage < totalPages && onClickActive(activePage + 1)
                    }
                >
                    <span className="page-link">Next</span>
                </li>
            </ul>
            <label htmlFor="count">
                Rows:
            <select className="count" id="count" onChange={(e) => onChangeCount(e.target.value)}>
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
