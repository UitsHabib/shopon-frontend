import _ from "lodash";

const Pagination = (props) => {
  const { totalUsers, pageCount, activePage, onClickPage } = props;
  const totalPages = Math.ceil(totalUsers/pageCount);
  const pages = _.range(1, totalPages + 1, 1);
//   if( totalUsers <= pageCount ) return null;
  return (
      <div>
        <nav style={{marginLeft:'40%',marginTop:'5%'}} aria-label="Page navigation example">
        <ul className="pagination">
            <li 
                style={{cursor:'pointer'}}
                onClick={ () => activePage - 1 >= 1 ? onClickPage(activePage -1) : null } 
                className="page-item"
            >
                <a className="page-link">
                Previous
                </a>
            </li>
            {
                pages.map((page) => {
                    return (
                        <>
                            <li 
                                style={{cursor:'pointer'}} 
                                onClick={() => onClickPage(page) } 
                                className={ activePage === page ? "page-item active" : "page-item"}
                                key={page}
                            >
                                <a className="page-link">
                                    {page}
                                </a>
                            </li>
                        </>
                    );
                    }
                )
            }

            <li className="page-item" 
                style={{cursor:'pointer'}} 
                onClick={ () => activePage + 1 <= totalPages ? onClickPage(activePage +1) : null }
            >
                <a className="page-link">
                Next
                </a>
            </li>
        </ul>
        </nav>
    </div>
  );
};

export default Pagination;
