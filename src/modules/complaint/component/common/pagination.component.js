import _ from "lodash";

const Pagination = ({ totalItems, pageCount, activePage, onClickPage }) => {
    const totalPages = Math.ceil(totalItems / pageCount);
    const pages = _.range(1, totalPages + 1, 1);

    if (totalItems <= pageCount) return null;
    return (
        <nav aria-label="Page navigation example" className="d-flex justify-content-center" >
            <ul className="pagination">
                <li
                    onClick={() =>
                        activePage - 1 >= 1 ? onClickPage(activePage - 1) : null
                    }
                    className="page-item"
                >
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                </li>
                {pages.map((page, index) => {
                    return (
                        <li
                            key={index}
                            onClick={() => onClickPage(page)}
                            className={
                                page === activePage
                                    ? "page-item active"
                                    : "page-item"
                            }
                        >
                            <a className="page-link">{page}</a>
                        </li>
                    );
                })}

                <li
                    onClick={() =>
                        activePage + 1 <= totalPages
                            ? onClickPage(activePage + 1)
                            : null
                    }
                    className="page-item"
                >
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;