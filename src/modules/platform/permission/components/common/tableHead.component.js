import { useHistory, useLocation } from "react-router-dom";

const TableHead = ({ columns }) => {
    const location = useLocation();
    const history = useHistory();

    const urlChange = (page, orderBy, sort) => {
        if(!sort) return null;

        const urlSearchParams = new URLSearchParams(window.location.search);
        urlSearchParams.set('page', page);
        urlSearchParams.set('orderBy', orderBy)

        const params = location.search.split('&');

        if(params.find(param => param === `orderBy=${orderBy}`)) {
            if(params.find(param => param === "orderType=asc")) {
                urlSearchParams.set('orderType', "desc")
            } else {
                urlSearchParams.set('orderType', "asc")
            }
        } else {
            urlSearchParams.set('orderType', "asc")
        }

        const url = location.pathname + urlSearchParams ? `?${urlSearchParams.toString()}` : '';
        history.push(url);
        window.scrollTo(0, 0);
    }

    const findSort = (path, sort) => {
        const params = location.search.split('&');

        if(sort && params.find(param => param === `orderBy=${path}`)) {
            if(params.find(param => param === "orderType=asc")) {
                return <i className="fas fa-arrow-down ms-1" />;
            } else {
                return <i className="fas fa-arrow-up ms-1" />;
            }
        } else {
            return null;
        }
    }

    return (
        <thead style={{ backgroundColor: '#144d43', color: '#ffffff' }}>
            <tr>
                {columns.map((column) => (
                    <th key={column.label} style={column.style} onClick={() => urlChange(1, column.path, column.sort)}>
                        {column.label}
                        {findSort(column.path, column.sort)}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHead;
