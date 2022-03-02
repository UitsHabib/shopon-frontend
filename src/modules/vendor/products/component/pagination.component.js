import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export default function Pagination({ start, end, page, total, shouldChangeBrowserUrl = true, shouldScrollToTop = true, onPageChange, disabled }) {
    const history = useHistory();
    const location = useLocation();

    const changePageTo = (page) => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        urlSearchParams.set('page', page);

        const url = location.pathname + urlSearchParams ? `?${urlSearchParams.toString()}` : '';

        shouldChangeBrowserUrl && history.push(url);
        shouldScrollToTop && window.scrollTo(0, 0);
        onPageChange && onPageChange({ url, urlSearchParams });
    }

    const isPrevDisabled = () => (page <= 1) || disabled;
    const isNextDisabled = () => (end === total) || disabled;

    return (
        (end < total || page > 1) &&
        <div className="pagination justify-content-end align-items-center border-top p-3">
            <span className="cdp-text-primary fw-bold">{start + ' - ' + end}</span> <span className="text-muted ps-1 pe-2"> {' of ' + total}</span>

            <span className="pagination-btn"
                onClick={() => !isPrevDisabled() && changePageTo(page - 1)}
                disabled={isPrevDisabled()}
                data-testid='Prev'
            >
                <i className="icon icon-arrow-down ms-2 prev"></i>
            </span>

            <span className="pagination-btn"
                onClick={() => !isNextDisabled() && changePageTo(page + 1)}
                disabled={isNextDisabled()}
                data-testid='Next'
            >
                <i className="icon icon-arrow-down ms-2 next"></i>
            </span>
        </div>
    )
}
