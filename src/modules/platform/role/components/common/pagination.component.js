import React from "react";
import _ from "lodash";

const Pagination = (props) => {
    const { itemsPerPage, totalItems, currentPage, onClickPage } = props;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pages = _.range(1, totalPages + 1, 1);

    return (
        <>
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    <li
                        className="page-item"
                        onClick={() =>
                            currentPage > 1
                                ? onClickPage(currentPage - 1)
                                : null
                        }
                    >
                        <a className="page-link" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    {pages.map((page) => (
                        <li
                            onClick={() => onClickPage(page)}
                            className={
                                page === currentPage
                                    ? "page-item active"
                                    : "page-item"
                            }
                            key={page}
                        >
                            <button className="page-link">{page}</button>
                        </li>
                    ))}
                    <li
                        className="page-item"
                        onClick={() =>
                            currentPage < totalPages
                                ? onClickPage(currentPage + 1)
                                : null
                        }
                    >
                        <a className="page-link" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Pagination;
//nfn rafc rafce
